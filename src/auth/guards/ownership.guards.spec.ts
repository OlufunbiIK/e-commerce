import { Test, TestingModule } from '@nestjs/testing';
import { OwnershipGuard } from './ownership.guards';
import { ProductService } from '../../product/product.service';
import { ExecutionContext } from '@nestjs/common';

describe('OwnershipGuard', () => {
  let guard: OwnershipGuard;
  const mockProductService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnershipGuard,
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compile();

    guard = module.get<OwnershipGuard>(OwnershipGuard);
  });

  it('should allow access for product owner', async () => {
    mockProductService.findOne.mockResolvedValue({ seller: { id: 1 } });
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: { id: 1 },
          params: { id: '1' }
        })
      })
    } as ExecutionContext;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });
}); 