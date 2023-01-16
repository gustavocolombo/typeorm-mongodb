import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from '../../../../lesson/infra/typeorm/entities/lesson.entity';

@Entity('entity')
export class Teacher {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  expertise: string;

  @Column()
  lessons?: string[];

  @ManyToOne(() => Lesson, (lesson) => lesson.teachers)
  @JoinColumn()
  lessonsList: Lesson[];

  @Column()
  numberSiape: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
