import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';
import { DaysOfClass } from '../enums/days-of-class.enum';

export class UpdateLessonDTO {
  @IsString()
  @IsOptional()
  teacher: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsDate()
  scheduleInit: Date;

  @IsString()
  @IsDate()
  scheduleEnd: Date;

  @IsString()
  @IsOptional()
  @IsArray()
  days: DaysOfClass[];
}
