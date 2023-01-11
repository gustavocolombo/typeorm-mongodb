import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { DaysOfClass } from '../enums/days-of-class.enum';

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @IsString()
  @IsOptional()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsDate()
  scheduleInit: Date;

  @IsString()
  @IsDate()
  scheduleEnd: Date;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  days: DaysOfClass[];

  @IsString()
  @IsNotEmpty()
  collegeDiscipline: string;
}
