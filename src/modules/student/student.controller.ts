import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { UpdateStudentDTO } from './dtos/update-student.dto';
import { Student } from './infra/typeorm/entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDTO: CreateStudentDTO): Promise<Student> {
    return await this.studentService.create(createStudentDTO);
  }

  @Get('/:registration')
  async index(@Param('registration') registration: string): Promise<Student> {
    return await this.studentService.index(registration);
  }

  @Put('/:registration')
  async update(
    @Param('registration') registration: string,
    @Body() updateStudentDTO: UpdateStudentDTO,
  ): Promise<Student> {
    return await this.studentService.update(registration, updateStudentDTO);
  }

  @Delete('/:registration')
  async delete(@Param('registration') registration: string): Promise<boolean> {
    return await this.studentService.delete(registration);
  }
}
