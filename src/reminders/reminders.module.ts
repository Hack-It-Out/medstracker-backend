import { Module } from '@nestjs/common';
import { ReminderService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { AfricastalkingService } from 'src/africastalking/africastalking.service';
import { RemindersCronJobProvider } from './reminderCronJobProvider';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [RemindersController],
  providers: [ReminderService, AfricastalkingService],
  exports: [],
})
export class RemindersModule {}
