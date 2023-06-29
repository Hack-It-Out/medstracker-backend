import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto, SignInDto } from './dto/auth.dto';
import * as brypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: AuthDto) {
    const { password, first_name, last_name, phone_no, email, avatar } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { phone_no },
    });
    if (foundUser) {
      throw new BadRequestException('This Phone number is already registered');
    }

    const hashedPassword = await this.hashPassword(password);
    const userData: Prisma.UserCreateInput = {
      phone_no,
      password: hashedPassword,
      first_name,
      last_name,
      email: email || '', // Set default value if not provided
      avatar: avatar || '',
    };

    await this.prisma.user.create({
      data: userData,
    });

    return { message: 'signup successful' };
  }

  async signin(dto: SignInDto, req: Request, res: Response) {
    const { phone_no, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { phone_no },
    });
    if (!foundUser) {
      throw new BadRequestException(
        'Please sign In with the registered phone number',
      );
    }

    const passMatch = await this.comparePasswords({
      password,
      hash: foundUser.password,
    });
    if (!passMatch) {
      throw new BadRequestException(
        'Please sign In with the registered phone number',
      );
    }

    const token = await this.signToken({
      id: foundUser.id,
      phone_no: foundUser.phone_no,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token);
    return res.send({ message: 'Sign In Successful', token });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Sign out successful' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await brypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { password: string; hash: string }) {
    return await brypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; phone_no: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: jwtSecret });
  }
}
