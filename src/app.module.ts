import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AfricastalkingModule } from './africastalking/africastalking.module';
import { MedsModule } from './meds/meds.module';
import { CaregiverModule } from './caregiver/caregiver.module';
import { RemindersModule } from './reminders/reminders.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    AfricastalkingModule,
    MedsModule,
    CaregiverModule,
    RemindersModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
