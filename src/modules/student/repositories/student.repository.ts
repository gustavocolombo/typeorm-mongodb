import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { CreateStudentDTO } from '../dtos/create-student.dto';
import { UpdateStudentDTO } from '../dtos/update-student.dto';
import { CrudInterface } from '../implementations/crud.interface';
import { Student } from '../infra/typeorm/entities/student.entity';
import { DeleteSerializer } from '../serializers/delete.serializer';
import { UpdateSerializer } from '../serializers/update.serializer';

export class StudentRepository implements CrudInterface<Student> {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async findOne(registration: string): Promise<Student> {
    try {
      const student = await this.studentRepository.findOne({
        where: { registration },
      });

      return student;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async create(createStudentDTO: CreateStudentDTO): Promise<Student> {
    try {
      const student = await this.studentRepository.create(createStudentDTO);
      return student;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async delete(registration: string): Promise<DeleteSerializer> {
    try {
      const student = await this.studentRepository.delete(registration);

      return student;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }

  async update(
    registration: string,
    updateStudentDTO: UpdateStudentDTO,
  ): Promise<UpdateSerializer> {
    try {
      const student = await this.studentRepository.update(registration, {
        ...updateStudentDTO,
      });

      return student;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
