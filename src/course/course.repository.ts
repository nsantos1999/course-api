import { EntityRepository, Repository } from 'typeorm';
import { AddCourseSectionDto } from './dto/add-course-section.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseSection } from './entities/course-section.entity';
import { Course } from './entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {
  async saveCourse(
    createCourseDto: CreateCourseDto,
    course: Course = new Course(),
  ) {
    // const course = new Course();

    course.name = createCourseDto.name;
    course.description = createCourseDto.description;
    course.price = createCourseDto.price;

    await course.save();

    return course;
  }

  async addModule(course: Course, AddCourseSectionDto: AddCourseSectionDto) {
    const { name, number } = AddCourseSectionDto;
    const newModule = CourseSection.create({
      name,
      number,
    });

    course.sections.push(newModule);

    await course.save();

    return newModule;
  }

  async updateModule(
    courseModuleId: number,
    course: Course,
    AddCourseSectionDto: AddCourseSectionDto,
  ) {
    const { name, number } = AddCourseSectionDto;
    course.sections = course.sections.map((section) => {
      if (section.id === courseModuleId) {
        section.name = name;
        section.number = number;

        return section;
      }

      return section;
    });

    await course.save();

    return course;
  }

  async deleteModule(courseModuleId: number, course: Course) {
    course.sections = course.sections.filter(
      (section) => section.id !== courseModuleId,
    );

    await course.save();

    return course;
  }
}
