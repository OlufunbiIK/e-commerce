import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from '../product/entities/product.entity';
import { CartItem } from '../cart-items/entities/cart-items.entity';

describe('CartService', () => {
  let service: CartService;
  const mockCartRepository = {
    findOne: jest.fn(),
  };
  const mockProductRepository = {
    findOne: jest.fn(),
  };
  const mockCartItemRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: getRepositoryToken(Cart), useValue: mockCartRepository },
        { provide: getRepositoryToken(Product), useValue: mockProductRepository },
        { provide: getRepositoryToken(CartItem), useValue: mockCartItemRepository },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      mockCartRepository.findOne.mockResolvedValue({ id: 1 });
      mockProductRepository.findOne.mockResolvedValue({ id: 1, price: 100 });
      mockCartItemRepository.create.mockReturnValue({});
      mockCartItemRepository.save.mockResolvedValue({});
      
      const result = await service.addToCart(1, 1, 2);
      expect(result).toBeDefined();
    });
  });
});
