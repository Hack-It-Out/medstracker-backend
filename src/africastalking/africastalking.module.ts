import { Module } from '@nestjs/common';
import { AfricastalkingService } from './africastalking.service';

@Module({
  providers: [AfricastalkingService],
  exports: [AfricastalkingService]
})
export class AfricastalkingModule {}
