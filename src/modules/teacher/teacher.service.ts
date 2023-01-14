import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDTO } from './dtos/create-teacher.dto';
import { UpdateTeacherDTO } from './dtos/update-teacher.dto';
import { Teacher } from './infra/typeorm/entities/teacher.entity';

interface UpdateTeacherResponse {
  performed: boolean;
  teacher: Teacher;
}

interface DeletedResultResponse {
  performed: boolean;
  affected: number;
}

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createTeacherDTO: CreateTeacherDTO): Promise<Teacher> {
    try {
      const verifyTeacherExists = await this.teacherRepository.findOne({
        where: { numberSiape: createTeacherDTO.numberSiape },
      });

      if (verifyTeacherExists)
        throw new BadRequestException(
          'Teacher with number SIAPE already exists',
        );

      const teacher = await this.teacherRepository.save(
        this.teacherRepository.create(createTeacherDTO),
      );

      return teacher;
    } catch (err) {
      console.log(err);
    }
  }

  async index(numberSiape: number): Promise<Teacher | null> {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { numberSiape },
      });

      return teacher ? teacher : null;
    } catch (error) {
      console.log('err', error);
    }
  }

  async update(
    numberSiape: number,
    updateTeacherDTO: UpdateTeacherDTO,
  ): Promise<UpdateTeacherResponse> {
    try {
      const verifyTeacherExists = await this.teacherRepository.findOne({
        where: { numberSiape },
      });

      if (!verifyTeacherExists)
        throw new BadRequestException('Teacher not found');

      const updateTeacher = await this.teacherRepository.update(
        updateTeacherDTO.numberSiape,
        {
          ...updateTeacherDTO,
        },
      );

      const teacher = await this.teacherRepository.findOne({
        where: { _id: verifyTeacherExists._id },
      });

      if (updateTeacher.affected === 1) {
        return {
          performed: true,
          teacher,
        };
      } else {
        return {
          performed: false,
          teacher,
        };
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async delete(numberSiape: number): Promise<DeletedResultResponse> {
    try {
      const teacher = await this.teacherRepository.delete(numberSiape);

      if (teacher.affected === 1) {
        return {
          performed: true,
          affected: 1,
        };
      } else {
        return {
          performed: false,
          affected: 0,
        };
      }
    } catch (error) {
      console.log('err', error);
    }
  }
}
