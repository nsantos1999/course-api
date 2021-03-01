import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';

const course = new Course();

course.id = 1;
course.name = 'Name Test';
course.description = 'Description Test';
course.createdAt = new Date();
course.updatedAt = new Date();

describe('CourseService', () => {
  let service: CourseService;

  const mockRepository = {
    saveCourse: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
    mockRepository.delete.mockReset();
    mockRepository.saveCourse.mockReset();
    mockRepository.update.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all courses', async () => {
      mockRepository.find.mockResolvedValue([course, course]);

      const courses = await service.findAll();

      expect(courses).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a existing course', async () => {
      mockRepository.findOne.mockResolvedValue(course);

      const courseFound = await service.findOne(1);

      expect(courseFound).toMatchObject({
        name: course.name,
      });
      expect(mockRepository.findOne).toHaveBeenCalled();
    });

    it('should return a exception when does not to find a course', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      expect(() => service.findOne(2)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a course', async () => {
      mockRepository.saveCourse.mockResolvedValue(course);

      const courseSaved = await service.create(course);

      expect(courseSaved).toBeInstanceOf(Course);
      expect(courseSaved).toMatchObject(course);
      expect(mockRepository.saveCourse).toHaveBeenCalled();
    });

    it('should return exception when does not to create a course', async () => {
      expect(mockRepository.saveCourse).not.toHaveBeenCalled();
      mockRepository.saveCourse.mockResolvedValue(null);

      expect(() => service.create(course)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
      expect(mockRepository.saveCourse).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      expect(mockRepository.saveCourse).not.toHaveBeenCalled();

      const updateData = {
        ...course,
        name: 'New Name Test',
        description: 'New Description Test',
        price: 105.5,
      };

      mockRepository.findOne.mockResolvedValue(course);
      mockRepository.saveCourse.mockResolvedValue(updateData);

      const courseSaved = await service.update(1, updateData);

      expect(courseSaved).toMatchObject(updateData);
      expect(courseSaved).toMatchObject({ id: course.id });
      expect(mockRepository.saveCourse).toHaveBeenCalled();
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a course', async () => {
      expect(mockRepository.delete).not.toHaveBeenCalled();

      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(mockRepository.delete).toHaveBeenCalled();
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should return exception when does not to delete a course', async () => {
      expect(mockRepository.delete).not.toHaveBeenCalled();

      mockRepository.delete.mockResolvedValue({ affected: 0 });

      expect(() => service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
