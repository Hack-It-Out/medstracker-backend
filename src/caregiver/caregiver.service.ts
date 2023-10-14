import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CaregiverDto } from './dto/caregiver.dto';

@Injectable()
export class CaregiverService {
    constructor(private prisma:PrismaService){}

    async createCaregiver(dto:CaregiverDto){
        const{first_name,last_name,phone_no}=dto;
        const caregiver=await this.prisma.caregiver.create({
            data: {first_name,last_name,phone_no},
          });
          return {message:"Caregiver has been added successfuly",};
    }
}