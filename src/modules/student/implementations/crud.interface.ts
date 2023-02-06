import { CreateStudentDTO } from '../dtos/create-student.dto';
import { UpdateStudentDTO } from '../dtos/update-student.dto';
import { Student } from '../infra/typeorm/entities/student.entity';
import { DeleteSerializer } from '../serializers/delete.serializer';
import { UpdateSerializer } from '../serializers/update.serializer';

export interface CrudInterface<T> {
  findOne(registration: string): Promise<Student | undefined>;
  create(createStudentDTO: CreateStudentDTO): Promise<Student>;
  delete(registration: string): Promise<DeleteSerializer>;
  update(
    registration: string,
    updateStudentDTO: UpdateStudentDTO,
  ): Promise<UpdateSerializer>;
}
