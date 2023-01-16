import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from '../../../../student/infra/typeorm/entities/student.entity';
import { Teacher } from '../../../../teacher/infra/typeorm/entities/teacher.entity';
import { DaysOfClass } from '../../../enums/days-of-class.enum';

@Entity('lesson')
export class Lesson {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  scheduleInit: Date;

  @Column()
  scheduleEnd: Date;

  @Column()
  days: DaysOfClass[];

  @Column()
  collegeDiscipline: string;

  @Column()
  code: string;

  @OneToMany(() => Teacher, (teacher) => teacher.lessonsList)
  @JoinColumn()
  teachers: Teacher;

  @ManyToMany(() => Student, (student) => student._id)
  @JoinColumn()
  student?: Student;

  @Column({ default: 50 })
  limitStudent: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
