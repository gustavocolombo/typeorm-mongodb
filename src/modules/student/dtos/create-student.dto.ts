import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentDTO {
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
  registration: string;
}
