import { Controller, Post } from '@nestjs/common';
import { ReminderService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post('send')
  async sendReminders() {
    await this.reminderService.sendReminders();
    return { message: 'Reminders sent successfully' };
  }
}
