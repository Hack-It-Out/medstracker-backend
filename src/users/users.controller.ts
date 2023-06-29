import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyUser(@Req() req: any) {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is provided in the Authorization header as "Bearer <token>"
    const user = await this.authService.getUserFromToken(token);
    if (!user) {
      throw new BadRequestException('Invalid token'); // Throw an exception if user is not found or token is invalid
    }
    delete user.password; // Remove sensitive information from the user object
    return user; // Return the user object
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
