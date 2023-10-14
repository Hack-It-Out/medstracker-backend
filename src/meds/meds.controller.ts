import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MedsService } from './meds.service';
import { CreateMedDto } from './dto/create-med.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('meds')
export class MedsController {
  constructor(
    private readonly medsService: MedsService,
    private authService: AuthService,
  ) {}

  @Post('create-meds')
  @UseGuards(JwtAuthGuard)
  async createMedicine(@Body() dto: CreateMedDto, @Req() req: any) {
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is provided in the Authorization header as "Bearer <token>"
    const user = await this.authService.getUserFromToken(token);
    if (!user) {
      throw new BadRequestException('Invalid token'); // Throw an exception if user is not found or token is invalid
    }
    const userId = req.user.id;
    return this.medsService.createMedicine(dto);
  }

  @Get(':id')
  findMedicine() {
    //return this.medsService.findOne(+id);
  }
}
