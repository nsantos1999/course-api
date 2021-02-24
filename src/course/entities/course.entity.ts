import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  static giveMeAValidCourse(): Course {
    const course = new Course();

    course.name = 'Name Test';
    course.description = 'Description Test';
    course.price = 100.5;
    course.createdAt = new Date();
    course.updatedAt = new Date();

    return course;
  }
}
