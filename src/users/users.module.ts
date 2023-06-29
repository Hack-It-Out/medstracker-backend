import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService],
})
export class UsersModule {}
