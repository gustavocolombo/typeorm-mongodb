import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateLessonDTO } from './dtos/create-lesson.dto';
import { UpdateLessonDTO } from './dtos/update-lesson.dto';
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

  @Get('/:code')
  async getLesson(@Param('code') code: string): Promise<Lesson> {
    return await this.lessonService.index(code);
  }

  @Put('/:code')
  async updateLesson(
    @Param('code') code: string,
    @Body() updateLessonDTO: UpdateLessonDTO,
  ): Promise<Lesson> {
    return await this.lessonService.update(code, updateLessonDTO);
  }

  @Delete('/:code')
  async deleteLesson(@Param('code') code: string): Promise<boolean> {
    return await this.lessonService.delete(code);
  }
}
