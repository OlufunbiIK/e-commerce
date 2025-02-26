import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';

describe('ReviewService', () => {
  let service: ReviewService;
  const mockReviewRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };
  const mockProductRepository = {
    findOne: jest.fn(),
  };
  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: getRepositoryToken(Review), useValue: mockReviewRepository },
        { provide: getRepositoryToken(Product), useValue: mockProductRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  describe('create', () => {
    it('should create a review with valid data', async () => {
      const dto = {
        rating: 5,
        comment: 'Great product',
        productId: 1,
        userId: 1
      };
      
      mockProductRepository.findOne.mockResolvedValue({ id: 1 });
      mockUserRepository.findOne.mockResolvedValue({ id: 1 });
      mockReviewRepository.create.mockReturnValue(dto);
      mockReviewRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
    });
  });
});
