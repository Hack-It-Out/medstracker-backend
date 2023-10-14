import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedDto } from './dto/create-med.dto';

@Injectable()
export class MedsService {
  constructor(private prisma: PrismaService) {}

  async createMedicine(dto: CreateMedDto) {
    const { name, type, amount, pills_per_time, duration, time } = dto;

    const timeObjects = time.map((timeString) => {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date;
    });

    const ownerId = 'cljh6iw190000cp51mh14nxks'; // Hard-coded owner ID

    const medicine = await this.prisma.medicine.create({
      data: {
        name,
        type,
        amount,
        pills_per_time,
        duration,
        time: { set: timeObjects },
        owner: { connect: { id: ownerId } },
      },
      include: {
        owner: true, // Include the owner relation in the created medicine object
      },
    });

    const createdMedicine = {
      id: medicine.id,
      name: medicine.name,
      type: medicine.type,
      amount: medicine.amount,
      pills_per_time: medicine.pills_per_time,
      duration: medicine.duration,
      time: medicine.time,
      owner: ownerId, // Use the hard-coded owner ID
      createdAt: medicine.createdAt,
      updatedAt: medicine.updatedAt,
    };

    return {
      message: 'Medicine has been added successfully',
      medicine: createdMedicine,
    };
  }
}
