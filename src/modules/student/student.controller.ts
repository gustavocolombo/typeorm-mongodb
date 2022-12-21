import { Body, Controller, Post } from '@nestjs/common';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { Student } from './infra/typeorm/entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDTO: CreateStudentDTO): Promise<Student> {
    return await this.studentService.create(createStudentDTO);
  }
}
