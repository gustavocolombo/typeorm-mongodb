import { Body, Controller, Post } from '@nestjs/common';
import { CreateLessonDTO } from './dtos/create-lesson.dto';
import { Lesson } from './infra/typeorm/entities/lesson.entity';
import { LessonService } from './lesson.service';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post()
  async createLesson(
    @Body() createLessonDTO: CreateLessonDTO,
  ): Promise<Lesson> {
    return await this.lessonService.create(createLessonDTO);
  }
}
