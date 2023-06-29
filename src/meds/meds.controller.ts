import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedsService } from './meds.service';
import { CreateMedDto } from './dto/create-med.dto';

@Controller('meds')
export class MedsController {
  constructor(private readonly medsService: MedsService) {}
  @Post("createMedicine")
  createMedicine(@Body() dto: CreateMedDto) {
    return this.medsService.createMedicine(dto);
  }

  @Get(':id')
  findMedicine(@Param('id') id: string) {
    //return this.medsService.findOne(+id);
  }

}
