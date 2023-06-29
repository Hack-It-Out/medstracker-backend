/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { ReminderService } from './reminders.service';

@Injectable()
export class RemindersCronJobProvider {
  constructor(
    @Inject(SchedulerRegistry)
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly reminderService: ReminderService,
  ) {}

  @Cron('4 18 * * *') // Execute at 6:04 PM every day
  async handleCronJob() {
    await this.reminderService.sendReminders();
  }
}
