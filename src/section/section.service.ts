import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseService } from 'src/course/course.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';
import { SectionRepository } from './section.repository';

@Injectable()
export class SectionService {
  constructor(
    @Inject(CourseService)
    private courseService: CourseService,

    @InjectRepository(SectionRepository)
    private sectionRepository: SectionRepository,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const { courseId } = createSectionDto;
    const course = await this.courseService.findOne(courseId);

    const section = await this.sectionRepository.saveSection(
      createSectionDto,
      course,
    );

    return section;
  }

  findAll(): Promise<Section[]> {
    return this.sectionRepository.find();
  }

  async findOne(id: number): Promise<Section> {
    const section = await this.sectionRepository.findOne(id);

    if (!section) {
      throw new NotFoundException(`Section with ID "${id}" not found`);
    }

    return section;
  }

  async update(
    id: number,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const { courseId } = updateSectionDto;
    const course = await this.courseService.findOne(courseId);

    let section = await this.findOne(id);

    section = await this.sectionRepository.saveSection(
      updateSectionDto,
      course,
      section,
    );

    return section;
  }

  async remove(id: number): Promise<void> {
    const { affected } = await this.sectionRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Section with ID "${id}" not found`);
    }
  }
}
