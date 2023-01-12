import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../infra/typeorm/entities/student.entity';
import { StudentService } from '../student.service';

describe('Testing user service', () => {
  let studentService: StudentService;
  let studentRepository: Repository<Student>;

  const mockReturnStudent = {
    firstname: 'John',
    lastname: 'Doe',
    age: 21,
    registration: '470167',
    createdAt: '2023-01-11T01:52:46.414Z',
    updatedAt: '2023-01-11T01:52:46.414Z',
    _id: '63be166eaea673ad35bb04de',
  };

  const mockStudentRegistration = '470167';

  const mockResponseDeleteStudent = true;

  const mockUpdateStudent = {
    firstname: 'William',
    lastname: 'Doe',
    age: 19,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: {
            create: jest.fn().mockReturnValue(mockReturnStudent),
            findOne: jest.fn().mockReturnValue(mockReturnStudent),
            save: jest.fn().mockResolvedValue(mockReturnStudent),
            update: jest.fn().mockReturnValue(mockReturnStudent),
            delete: jest.fn().mockReturnValue(mockResponseDeleteStudent),
          },
        },
      ],
    }).compile();
    studentService = module.get<StudentService>(StudentService);
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Check service is defined', () => {
    it('should be defined', async () => {
      expect(studentService).toBeDefined();
    });
  });

  describe('Create student function', () => {
    it('should be able create a new student', async () => {
      const mockStudent = {
        firstname: 'John',
        lastname: 'Doe',
        age: 21,
        registration: '470165',
      };

      jest.spyOn(studentRepository, 'findOne').mockReturnValueOnce(null);

      const student = await studentService.create(mockStudent);

      expect(student).toEqual(mockReturnStudent);
      expect(studentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(studentRepository.create).toHaveBeenCalledTimes(1);
      expect(studentRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get student function', () => {
    it('should be able get a student', async () => {
      const student = await studentService.index(mockStudentRegistration);

      expect(student).toEqual(mockReturnStudent);
      expect(studentRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update student function', () => {
    it('should be able update a student', async () => {
      const student = await studentService.update(
        mockStudentRegistration,
        mockUpdateStudent,
      );

      expect(student).toEqual(mockReturnStudent);
      expect(studentRepository.findOne).toHaveBeenCalledTimes(2);
      expect(studentRepository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete student function', () => {
    it('should be able delete a student', async () => {
      const student = await studentService.delete(mockStudentRegistration);

      expect(student).toEqual(true);
      expect(studentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(studentRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
