import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDTO {
  @IsString()
  @IsOptional()
  firstname: string;

  @IsString()
  @IsOptional()
  lastname: string;

  @IsNumber()
  @IsOptional()
  age: number;
}
