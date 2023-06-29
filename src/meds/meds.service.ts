import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedDto } from './dto/create-med.dto';

@Injectable()
export class MedsService {
  constructor(private prisma: PrismaService) {}

  async createMedicine(dto: CreateMedDto){
    const { name, type, amount,pills_per_time, duration, time } = dto;
    const medicine = await this.prisma.medicine.create({
      data: {name,type,amount,pills_per_time,duration,time},
    });
    return {message:"Message has been added successfuly",medicine};
  }
}
