import { Controller, Post } from '@nestjs/common';
import { ReminderService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly reminderService: ReminderService) {}

  @Post('send')
  async sendReminders() {
    try {
      await this.reminderService.sendReminders();
      return { message: 'Reminders sent successfully' };
    } catch (error) {
      return { message: 'Failed to send reminders' };
    }
  }
}
