import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { DaysOfClass } from '../enums/days-of-class.enum';

export class CreateLessonDTO {
  @IsString()
  @IsNotEmpty()
  teacher: string;

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
