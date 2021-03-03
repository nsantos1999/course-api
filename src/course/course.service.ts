import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { AddCourseSectionDto } from './dto/add-course-section.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const userSaved = await this.courseRepository.saveCourse(createCourseDto);

    if (!userSaved) {
      throw new InternalServerErrorException(
        'We had trouble saving the course',
      );
    }

    return userSaved;
  }

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const courseFounded = await this.courseRepository.findOne(id, {
      relations: ['sections'],
    });

    if (!courseFounded) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }

    return courseFounded;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);

    return this.courseRepository.saveCourse(updateCourseDto, course);
  }

  async remove(id: number) {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID "${id}" not found`);
    }
  }

  async addModule(courseId: number, AddCourseSectionDto: AddCourseSectionDto) {
    const course = await this.findOne(courseId);

    return await this.courseRepository.addModule(course, AddCourseSectionDto);
  }

  async updateModule(
    courseId: number,
    courseModuleId: number,
    AddCourseSectionDto: AddCourseSectionDto,
  ) {
    const course = await this.findOne(courseId);

    return await this.courseRepository.updateModule(
      courseModuleId,
      course,
      AddCourseSectionDto,
    );
  }

  async deleteModule(courseId: number, courseModuleId: number) {
    const course = await this.findOne(courseId);

    const remainingModulesAmount = course.sections.length;

    const courseWithRemainingModules = await this.courseRepository.deleteModule(
      courseModuleId,
      course,
    );

    if (remainingModulesAmount === course.sections.length) {
      throw new NotFoundException(
        `Course module with ID "${courseModuleId}" not found`,
      );
    }

    return courseWithRemainingModules;
  }
}
