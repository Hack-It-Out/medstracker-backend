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
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  private currentUser: User | null = null;
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

    this.currentUser = foundUser; // Assign the found user object to the currentUser property

    res.setHeader('Authorization', `Bearer ${token}`);
    return res.send({ message: 'Sign In Successful', token });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
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

  async getUserFromToken(token: string): Promise<User | null> {
    try {
      const decoded = await this.jwt.verifyAsync(token, { secret: jwtSecret });
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });
      return user;
    } catch (error) {
      return null; // Token verification failed or user not found
    }
  }
}
