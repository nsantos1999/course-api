import { EntityRepository, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async saveCourse(
    createCourseDto: CreateCourseDto,
    course: Course = new Course(),
  ) {
    course.name = createCourseDto.name;
    course.description = createCourseDto.description;
    course.price = createCourseDto.price;

    await course.save();

    return course;
  }
}
