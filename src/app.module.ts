import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './modules/student/infra/typeorm/entities/student.entity';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mongodb',
        url: process.env.DATABASE_URL,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        synchronize: true,
        entities: [Student],
        then: console.log(`Database started on port ${process.env.PORT}`),
      }),
    }),
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
