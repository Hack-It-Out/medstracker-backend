import { IsNotEmpty, IsString, IsInt, IsArray, ArrayNotEmpty, IsDateString } from 'class-validator';

export class CreateMedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsDateString()
  time: string[];
}
