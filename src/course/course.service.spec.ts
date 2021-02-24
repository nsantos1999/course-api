import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

describe('CourseService', () => {
  let service: CourseService;

  const mockRepository = {
    saveCourse: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.remove.mockReset();
    mockRepository.saveCourse.mockReset();
    mockRepository.update.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all courses', async () => {
      const course = Course.giveMeAValidCourse();
      mockRepository.find.mockReturnValue([course, course]);

      const courses = await service.findAll();

      expect(courses).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find a existing course', async () => {
      const course = Course.giveMeAValidCourse();
      mockRepository.findOne.mockReturnValue(course);

      const courseFound = await service.findOne(1);

      expect(courseFound).toMatchObject({
        name: course.name,
      });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return a exception when does not to find a course', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findOne(2)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a course', async () => {
      const course = Course.giveMeAValidCourse();
      mockRepository.saveCourse.mockReturnValue(course);

      const courseSaved = service.create(course);

      expect(courseSaved).toBeInstanceOf(Course);
      expect(courseSaved).toMatchObject(course);
      expect(mockRepository.saveCourse).toHaveBeenCalledTimes(1);
    });

    it('should return exception when does not to create a course', async () => {
      const course = Course.giveMeAValidCourse();
      mockRepository.saveCourse.mockReturnValue(null);

      service.create(course).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
      });
      expect(mockRepository.saveCourse).toHaveBeenCalledTimes(1);
    });
  });
});
