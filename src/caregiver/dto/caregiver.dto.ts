import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CaregiverDto {
  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone_no:string;
}
