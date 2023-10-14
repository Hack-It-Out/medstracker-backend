import { Module } from '@nestjs/common';
import { MedsService } from './meds.service';
import { MedsController } from './meds.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [MedsController],
  providers: [MedsService, AuthService],
})
export class MedsModule {}
