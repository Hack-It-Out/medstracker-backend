import { Injectable } from '@nestjs/common';
import { CreateMedDto } from './dto/create-med.dto';
import { UpdateMedDto } from './dto/update-med.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MedsService {
  constructor(private Prisma: PrismaService) {}
}
