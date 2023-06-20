import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { IsEmail } from 'class-validator';

@Injectable()
export class AuthService {
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }

  constructor(private prisma:PrismaService){}
  async signup(dto:AuthDto){
    const {email,password,first_name,last_name,phone_number}=dto;
    return {message: "signup successful"};
  }
  async signin(){
    return {message: "signin successful"};
  }
  async signout(){
    return {message: "signout successful"};
  }
}
