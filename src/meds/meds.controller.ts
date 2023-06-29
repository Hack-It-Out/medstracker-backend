import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedsService } from './meds.service';
import { CreateMedDto } from './dto/create-med.dto';
import { UpdateMedDto } from './dto/update-med.dto';

@Controller('meds')
export class MedsController {
  constructor(private readonly medsService: MedsService) {}

  @Post()
  createMedicine(@Body() createMedDto: CreateMedDto) {
    //return this.medsService.create(createMedDto);
  }

  @Get(':id')
  findMedicine(@Param('id') id: string) {
    //return this.medsService.findOne(+id);
  }
}
