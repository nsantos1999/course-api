import { Inject } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {
  async saveSection(
    saveSectionDto: CreateSectionDto | UpdateSectionDto,
    course: Course,
    section = new Section(),
  ) {
    const { name, number } = saveSectionDto;

    section.name = name;
    section.number = number;
    section.course = course;

    await section.save();

    return section;
  }
}
