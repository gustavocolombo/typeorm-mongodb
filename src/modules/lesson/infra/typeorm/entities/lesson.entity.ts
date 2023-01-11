import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  teacherId: string;

  @JoinColumn({ name: 'teacherId' })
  @OneToMany(() => Teacher, (teacher) => teacher._id)
  teachers: Teacher[];

  @Column()
  studentId?: string;

  @JoinColumn({ name: 'studentId' })
  @OneToMany(() => Student, (student) => student._id)
  student?: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
