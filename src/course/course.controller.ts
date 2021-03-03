import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { AddCourseSectionDto } from './dto/add-course-section.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseSection } from './entities/course-section.entity';
import { Course } from './entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    type: Course,
    description: 'Creates new course',
  })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({
    type: Course,
    isArray: true,
    description: 'Find all courses',
  })
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: Course,
    description: 'Find one course by id',
  })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: Course,
    description: 'Update course by id',
  })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete course',
  })
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }

  @Post(':courseId/section')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: CourseSection,
    description: 'Add section into course',
  })
  addModule(
    @Param('courseId') courseId: string,
    @Body() addCourseSectionDto: AddCourseSectionDto,
  ) {
    return this.courseService.addModule(+courseId, addCourseSectionDto);
  }

  @Put(':courseId/section/:courseSectionId')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    type: Course,
    description: 'Update section of course',
  })
  updateModule(
    @Param('courseId') courseId: string,
    @Param('courseSectionId') courseSectionId: string,
    @Body() addCourseSectionDto: AddCourseSectionDto,
  ) {
    return this.courseService.updateModule(
      +courseId,
      +courseSectionId,
      addCourseSectionDto,
    );
  }

  @Delete(':courseId/section/:courseSectionId')
  @ApiOkResponse({
    type: Course,
    description: 'Delete section of course',
  })
  deleteModule(
    @Param('courseId') courseId: string,
    @Param('courseSectionId') courseSectionId: string,
  ) {
    return this.courseService.deleteModule(+courseId, +courseSectionId);
  }
}
