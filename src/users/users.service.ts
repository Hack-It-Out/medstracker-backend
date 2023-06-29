import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request): Promise<User | null> {
    const decodedUser = req.user as { id: string; phone_no: string };
    if (id !== decodedUser.id) {
      throw new ForbiddenException();
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
}
