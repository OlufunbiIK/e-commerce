import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { PaginationProvider } from '../common/pagination/providers/pagination.service';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
  compare: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockPaginationProvider = {
    paginationQuery: jest.fn(),
  };

  const mockFindOneByEmailProvider = {
    findOneByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: PaginationProvider, useValue: mockPaginationProvider },
        {
          provide: FindOneByEmailProvider,
          useValue: mockFindOneByEmailProvider,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
      };

      mockUserRepository.create.mockReturnValue(dto);
      mockUserRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result.password).not.toBe('password123');
      expect(bcrypt.hash).toHaveBeenCalled(); // Ensure bcrypt.hash is called
    });
  });
});
