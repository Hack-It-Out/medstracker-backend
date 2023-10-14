import { Body, Controller, Post } from '@nestjs/common';
import { CaregiverService } from './caregiver.service';
import { CaregiverDto } from './dto/caregiver.dto';

@Controller('caregiver')
export class CaregiverController {
  constructor(private readonly caregiverService: CaregiverService) {}

  @Post("register")
  register(@Body() dto:CaregiverDto){
    return this.caregiverService.createCaregiver(dto);
  }
}
