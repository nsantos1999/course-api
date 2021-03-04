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
// import { CourseSection } from './course-module.entity';
import { Section } from 'src/section/entities/section.entity';

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
  @OneToMany((type) => Section, (courseSection) => courseSection.course, {
    cascade: ['insert', 'update'],
  })
  sections: Section[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
