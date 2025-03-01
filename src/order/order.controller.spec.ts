import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UserRole } from '../user/enum/userRole.enum';
import { OrderStatus } from './enum/orderStatus.enum';
import { ForbiddenException } from '@nestjs/common';

describe('OrderController', () => {
  let controller: OrderController;
  const mockOrderService = {
    updateOrderStatus: jest.fn(),
    getOrderById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should allow admin to update order status', async () => {
    const orderId = 1;
    const status = OrderStatus.SHIPPED;
    const updatedOrder = { id: orderId, status };

    mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);

    const result = await controller.updateOrderStatus(orderId, status, {
      user: { role: UserRole.ADMIN },
    });

    expect(result).toEqual(updatedOrder);
    expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith(
      orderId,
      status,
      { role: UserRole.ADMIN },
    );
  });

  it('should throw ForbiddenException if non-admin tries to update', async () => {
    mockOrderService.updateOrderStatus.mockRejectedValue(
      new ForbiddenException(),
    );

    await expect(
      controller.updateOrderStatus(1, OrderStatus.SHIPPED, {
        user: { role: UserRole.CUSTOMER },
      }),
    ).rejects.toThrow(ForbiddenException);
  });
});
