/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enum/orderStatus.enum';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserRole } from '../user/enum/userRole.enum';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

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
        { provide: getRepositoryToken(Order), useValue: mockOrderRepository },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: UserService, useValue: { findOneById: jest.fn() } }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should update order status if admin', async () => {
    const order = { id: 1, status: OrderStatus.PENDING, user: { id: 1 } };
    mockOrderRepository.findOne.mockResolvedValue(order);
    mockOrderRepository.save.mockResolvedValue({
      ...order,
      status: OrderStatus.SHIPPED,
    });

    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password',
      role: UserRole.ADMIN,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      products: [],
      carts: [],
      orders: [],
      reviews: []
    };

       const updatedOrder = await service.updateOrderStatus(
      1,
      OrderStatus.SHIPPED,
      mockUser, // Pass full user object instead of { role }
    );

    expect(updatedOrder.status).toBe(OrderStatus.SHIPPED);
  });
});
