import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AfricastalkingService } from 'src/africastalking/africastalking.service';

@Injectable()
export class ReminderService {
  constructor(
    private prisma: PrismaService,
    private africastalkingService: AfricastalkingService,
  ) {}

  async sendReminders() {
    const medicines = await this.prisma.medicine.findMany({
      where: {
        time: {
          has: '18:04', // Adjust the time as needed
        },
      },
      include: {
        owner: true,
      },
    });

    try {
      // Send reminders for each medicine
      for (const medicine of medicines) {
        const message = `Reminder: It's time to take your ${medicine.name} medication.`;
        const phoneNumber = medicine.owner.phone_no;

        // Send the reminder SMS
        await this.africastalkingService.sendSMS({
          to: [phoneNumber],
          message,
        });

        console.log(`Reminder sent to ${phoneNumber}: ${message}`);
      }
    } catch (error) {
      console.error('Error occurred while sending reminders:', error);
    }
  }
}
