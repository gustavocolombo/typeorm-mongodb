import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDTO } from './dtos/create-lesson.dto';
import { Lesson } from './infra/typeorm/entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDTO: CreateLessonDTO): Promise<Lesson> {
    const lesson = await this.lessonRepository.create(createLessonDTO);

    return lesson;
  }
}
