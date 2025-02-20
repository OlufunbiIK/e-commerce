import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enum/orderStatus.enum';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRole } from 'src/user/enum/userRole.enum';

const mockOrderRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should update order status if admin', async () => {
    const order = { id: 1, status: OrderStatus.PENDING, user: { id: 1 } };
    mockOrderRepository.findOne.mockResolvedValue(order);
    mockOrderRepository.save.mockResolvedValue({ ...order, status: OrderStatus.SHIPPED });

    const updatedOrder = await service.updateOrderStatus(1, OrderStatus.SHIPPED, { role: UserRole.ADMIN });

    expect(updatedOrder.status).toBe(OrderStatus.SHIPPED);
  });
});
