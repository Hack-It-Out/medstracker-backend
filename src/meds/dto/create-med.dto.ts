import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { IsTime } from 'src/utils/validator';

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
  pills_per_time: number;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsTime({ each: true }) // Apply the IsTime decorator to each time value in the array
  time: string[];

  owner: string;
}
