import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CourseSection } from './course-section.entity';
// import { CourseSection } from './course-module.entity';

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
  @OneToMany((type) => CourseSection, (courseSection) => courseSection.course, {
    cascade: ['insert', 'update'],
  })
  sections: CourseSection[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
