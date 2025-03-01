import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { PaginationProvider } from '../common/pagination/provider/pagination.service';

describe('ProductService', () => {
  let service: ProductService;
  const mockProductRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };
  const mockCategoryService = {
    findOneById: jest.fn(),
  };
  const mockUserService = {
    findOneById: jest.fn(),
  };
  const mockPaginationProvider = {
    paginate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        { provide: PaginationProvider, useValue: mockPaginationProvider },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product with valid data', async () => {
      const dto = {
        title: 'Test Product',
        category: '1',
        sellerId: '1',
        price: 100,
        stock: 10,
        description: 'Test description',
      };

      mockCategoryService.findOneById.mockResolvedValue({ id: 1 });
      mockUserService.findOneById.mockResolvedValue({ id: 1 });
      mockProductRepository.create.mockReturnValue(dto);
      mockProductRepository.save.mockResolvedValue(dto);

      const result = await service.create(dto);
      expect(result).toEqual(dto);
      expect(mockProductRepository.save).toHaveBeenCalled();
    });
  });
});
