import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionRepository } from './section.repository';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [TypeOrmModule.forFeature([SectionRepository]), CourseModule],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
