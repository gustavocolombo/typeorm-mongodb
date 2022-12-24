import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDTO } from './dtos/create-lesson.dto';
import { UpdateLessonDTO } from './dtos/update-lesson.dto';
import { Lesson } from './infra/typeorm/entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDTO: CreateLessonDTO): Promise<Lesson> {
    const lesson = await this.lessonRepository.save(
      this.lessonRepository.create(createLessonDTO),
    );

    return lesson;
  }

  async index(code: string): Promise<Lesson | null> {
    const lesson = await this.lessonRepository.findOne({ where: { code } });

    if (!lesson) throw new BadRequestException('Lesson not found');

    return lesson || null;
  }

  async update(
    code: string,
    updateLessonDTO: UpdateLessonDTO,
  ): Promise<Lesson> {
    let lesson = await this.lessonRepository.findOne({ where: { code } });

    if (!lesson) throw new BadRequestException('Lesson not found');

    await this.lessonRepository.update(
      { id: lesson.id },
      { ...updateLessonDTO },
    );

    lesson = await this.lessonRepository.findOne({ where: { id: lesson.id } });

    return lesson;
  }

  async delete(code: string): Promise<boolean> {
    const lesson = await this.lessonRepository.findOne({ where: { code } });

    if (!lesson) throw new BadRequestException('Lesson not found');

    const deletedLesson = await this.lessonRepository.delete({ code });

    return true ? deletedLesson.affected === 1 : false;
  }
}
