import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, isNumber, isString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5,20,{message:"Passowrd should be between 5 and 20 characters"})
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name:string;

  @IsNotEmpty()
  @IsString()
  last_name:string;

  @IsNumber()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number:number;
}