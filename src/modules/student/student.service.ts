import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { Student } from './infra/typeorm/entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDTO: CreateStudentDTO): Promise<Student> {
    const checkStudentExists = await this.studentRepository.findOne({
      where: { registration: createStudentDTO.registration },
    });

    if (checkStudentExists)
      throw new BadRequestException('Student already exists!');

    const student = await this.studentRepository.save(
      this.studentRepository.create(createStudentDTO),
    );

    return student;
  }
}
