import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './modules/lesson/infra/typeorm/entities/lesson.entity';
import { LessonModule } from './modules/lesson/lesson.module';
import { Student } from './modules/student/infra/typeorm/entities/student.entity';
import { StudentModule } from './modules/student/student.module';
import { Teacher } from './modules/teacher/infra/typeorm/entities/teacher.entity';
import { TeacherModule } from './modules/teacher/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mongodb',
        url: 'mongodb+srv://mongo:mongotypeorm@mongo-typeorm.fegzh4u.mongodb.net/?retryWrites=true&w=majority',
        useUnifiedTopology: true,
        useNewUrlParser: true,
        synchronize: true,
        entities: [Student, Lesson, Teacher],
      }),
    }),
    StudentModule,
    LessonModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
