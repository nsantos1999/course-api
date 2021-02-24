import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseRepository)
    private courseRepository: CourseRepository,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const userSaved = this.courseRepository.saveCourse(createCourseDto);

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
    const courseFounded = await this.courseRepository.findOne(id);

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
}
