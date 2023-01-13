import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../infra/typeorm/entities/teacher.entity';
import { TeacherService } from '../teacher.service';

describe('Testing Teacher service', () => {
  let teacherService: TeacherService;
  let teacherRepository: Repository<Teacher>;

  const mockReturnTeacher = {
    _id: '63be166eaea673ad35bb04de',
    firstname: 'John',
    lastname: 'Doe',
    age: 49,
    expertise: 'Algorithms',
    numberSiape: 470973,
    createdAt: '2023-01-11T01:52:46.414Z',
    updatedAt: '2023-01-11T01:52:46.414Z',
  };

  const mockTeacherCreateData = {
    firstname: 'John',
    lastname: 'Doe',
    age: 49,
    expertise: 'Algorithms',
    numberSiape: 470973,
  };

  const mockTeacherUpdateData = {
    firstname: 'William',
    lastname: 'Doe',
    age: 49,
    expertise: 'Database',
    numberSiape: 470973,
  };

  const mockTeacherDeleteReturn = {
    affected: 1,
    performed: true,
  };

  const mockTeacherUpdate = {
    affected: 1,
  };

  const UpdateTeacherResponse = {
    performed: true,
    teacher: {
      _id: '63be166eaea673ad35bb04de',
      firstname: 'John',
      lastname: 'Doe',
      age: 49,
      expertise: 'Algorithms',
      numberSiape: 470973,
      createdAt: '2023-01-11T01:52:46.414Z',
      updatedAt: '2023-01-11T01:52:46.414Z',
    },
  };

  const mockTeacherSiape = 470973;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: {
            create: jest.fn().mockReturnValue(mockReturnTeacher),
            save: jest.fn().mockResolvedValue(mockReturnTeacher),
            findOne: jest.fn().mockReturnValue(mockReturnTeacher),
            update: jest.fn().mockReturnValue(mockTeacherUpdate),
            delete: jest.fn().mockReturnValue(mockTeacherDeleteReturn),
          },
        },
      ],
    }).compile();
    teacherService = module.get<TeacherService>(TeacherService);
    teacherRepository = module.get<Repository<Teacher>>(
      getRepositoryToken(Teacher),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Service should be defined', () => {
    it('should be defined', () => {
      expect(teacherService).toBeDefined();
    });
  });

  describe('Create Teacher function', () => {
    it('should be able create a new teacher', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockReturnValueOnce(null);

      const teacher = await teacherService.create(mockTeacherCreateData);
      expect(teacher).toEqual(mockReturnTeacher);
      expect(teacherRepository.findOne).toHaveBeenCalledTimes(1);
      expect(teacherRepository.create).toHaveBeenCalledTimes(1);
      expect(teacherRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should not be able create a new teacher', async () => {
      expect(
        Promise.reject(teacherService.create(mockTeacherCreateData)),
      ).rejects.toThrowError(
        new BadRequestException('Teacher with number SIAPE already exists'),
      );
      expect(teacherRepository.findOne).toHaveBeenCalledTimes(1);
      expect(teacherRepository.create).toHaveBeenCalledTimes(0);
      expect(teacherRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('Get Teacher function', () => {
    it('should be able get a teacher', async () => {
      const teacher = await teacherService.index(mockTeacherSiape);

      expect(teacher).toEqual(mockReturnTeacher);
      expect(teacherRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should not be able get a teacher', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockReturnValueOnce(null);

      expect(await teacherService.index(mockTeacherSiape)).toEqual(null);
      expect(teacherRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update teacher function', () => {
    it('should be able update teacher', async () => {
      const teacher = await teacherService.update(
        mockTeacherSiape,
        mockTeacherUpdateData,
      );

      expect(teacher).toEqual(UpdateTeacherResponse);
      expect(teacherRepository.findOne).toHaveBeenCalledTimes(2);
      expect(teacherRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should not be able update teacher', async () => {
      expect(
        Promise.reject(
          teacherService.update(mockTeacherSiape, mockTeacherUpdateData),
        ),
      ).rejects.toThrowError(new BadRequestException('Teacher not found'));
      expect(teacherRepository.findOne).toHaveBeenCalledTimes(1);
      expect(teacherRepository.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('Delete Teacher function', () => {
    it('should be able delete a teacher', async () => {
      const teacher = await teacherService.delete(mockTeacherSiape);

      expect(teacher).toEqual(mockTeacherDeleteReturn);
      expect(teacherRepository.delete).toHaveBeenCalledTimes(1);
    });
    it('should not be able delete a teacher', async () => {
      expect(
        Promise.reject(await teacherService.delete(mockTeacherSiape)),
      ).rejects.toThrowError(new Error());
      expect(teacherRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
