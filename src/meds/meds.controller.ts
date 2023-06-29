import { Controller } from '@nestjs/common';
import { MedsService } from './meds.service';

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
