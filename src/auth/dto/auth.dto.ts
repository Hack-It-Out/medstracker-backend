import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class AuthDto {
  // @IsEmail()
  // @IsNotEmpty()
  // @IsString()
  // email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20, { message: 'Passowrd should be between 5 and 20 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_no: string;

  email?: string;
  avatar?: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone_no: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20, { message: 'Password should be between 5 and 20 characters' })
  password: string;
}
