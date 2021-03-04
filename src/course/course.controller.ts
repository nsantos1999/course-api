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
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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
}
