import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/infra/typeorm/entities/student.entity';
import { Teacher } from '../teacher/infra/typeorm/entities/teacher.entity';
import { Lesson } from './infra/typeorm/entities/lesson.entity';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Teacher, Student])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
