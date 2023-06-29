import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedDto } from './dto/create-med.dto';

@Injectable()
export class MedsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMedDto){
    const { name, type, amount, duration, time } = dto;
    const medicine = await this.prisma.medicine.create({
      data: {
        name,
        type,
        amount,
        duration,
        time,
      },
    });
    return medicine;
  }
}
