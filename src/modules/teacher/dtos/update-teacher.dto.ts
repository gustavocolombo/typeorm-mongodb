import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeacherDTO {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  expertise?: string;

  @IsString()
  @IsArray()
  @IsOptional()
  lesson?: string[];

  @IsNumber()
  @IsOptional()
  numberSiape?: number;
}
