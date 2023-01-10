import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTeacherDTO } from './dtos/create-teacher.dto';
import { UpdateTeacherDTO } from './dtos/update-teacher.dto';
import { Teacher } from './infra/typeorm/entities/teacher.entity';
import { TeacherService } from './teacher.service';

interface UpdateTeacherResponse {
  performed: boolean;
  teacher: Teacher;
}

interface DeletedResultResponse {
  performed: boolean;
  affected: number;
}

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Post()
  async create(@Body() createTeacherDTO: CreateTeacherDTO): Promise<Teacher> {
    return await this.teacherService.create(createTeacherDTO);
  }

  @Get('/:numberSiape')
  async index(@Param('registration') numberSiape: number): Promise<Teacher> {
    return await this.teacherService.index(numberSiape);
  }

  @Put('/:numberSiape')
  async update(
    @Param('numberSiape') numberSiape: number,
    @Body() updateTeacherDTO: UpdateTeacherDTO,
  ): Promise<UpdateTeacherResponse> {
    return await this.teacherService.update(numberSiape, updateTeacherDTO);
  }

  @Delete('/:numberSiape')
  async delete(
    @Param('numberSiape') numberSiape: number,
  ): Promise<DeletedResultResponse> {
    return await this.teacherService.delete(numberSiape);
  }
}
