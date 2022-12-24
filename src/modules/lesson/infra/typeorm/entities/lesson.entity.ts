import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  teacher: string;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
