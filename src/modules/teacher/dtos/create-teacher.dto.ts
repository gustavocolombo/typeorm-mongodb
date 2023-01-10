import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTeacherDTO {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  expertise: string;

  @IsString()
  @IsArray()
  @IsOptional()
  lesson?: string[];

  @IsNumber()
  @IsNotEmpty()
  numberSiape: number;
}
