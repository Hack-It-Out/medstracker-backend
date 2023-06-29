import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { AfricastalkingModule } from './africastalking/africastalking.module';

@Module({
  imports: [AuthModule,PrismaModule, UsersModule, AfricastalkingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
