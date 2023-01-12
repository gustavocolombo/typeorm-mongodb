import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { UpdateStudentDTO } from './dtos/update-student.dto';
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

  async index(registration: string): Promise<Student | null> {
    const student = await this.studentRepository.findOne({
      where: { registration },
    });

    return student || null;
  }

  async update(
    registration: string,
    updateStudentDTO: UpdateStudentDTO,
  ): Promise<any> {
    let student = await this.studentRepository.findOne({
      where: { registration },
    });

    if (!student) throw new BadRequestException('Student not found');

    await this.studentRepository.update(
      { registration },
      { ...updateStudentDTO },
    );

    student = await this.studentRepository.findOne({ where: { registration } });

    return student;
  }

  async delete(registration: string): Promise<boolean> {
    const student = await this.studentRepository.findOne({
      where: { registration },
    });

    if (!student) throw new BadRequestException('Student not found');

    const deletedStudent = await this.studentRepository.delete({
      registration,
    });

    return deletedStudent.affected === 1 ? true : false;
  }
}
