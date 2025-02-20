import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/enum/userRole.enum';
import { OrderStatus } from './enum/orderStatus.enum';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

const mockOrderService = {
  updateOrderStatus: jest.fn(),
  getOrderById: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateOrderStatus', () => {
    it('should allow admin to update order status', async () => {
      const orderId = 1;
      const updatedOrder = { id: orderId, status: OrderStatus.SHIPPED };
      mockOrderService.updateOrderStatus.mockResolvedValue(updatedOrder);

      const result = await controller.updateOrderStatus(orderId, OrderStatus.SHIPPED, { user: { role: UserRole.ADMIN } });

      expect(result).toEqual(updatedOrder);
      expect(mockOrderService.updateOrderStatus).toHaveBeenCalledWith(orderId, OrderStatus.SHIPPED, { role: UserRole.ADMIN });
    });

    it('should throw ForbiddenException if non-admin tries to update', async () => {
      await expect(controller.updateOrderStatus(1, OrderStatus.SHIPPED, { user: { role: UserRole.CUSTOMER } }))
        .rejects
        .toThrow(ForbiddenException);
    });
  });

  describe('getOrderById', () => {
    it('should return order details for the owner', async () => {
      const orderId = 1;
      const user = { id: 1, role: UserRole.CUSTOMER };
      const order = { id: orderId, user };

      mockOrderService.getOrderById.mockResolvedValue(order);

      const result = await controller.getOrderById(orderId, { user });

      expect(result).toEqual(order);
      expect(mockOrderService.getOrderById).toHaveBeenCalledWith(orderId, user);
    });

    it('should throw NotFoundException if order does not exist', async () => {
      mockOrderService.getOrderById.mockRejectedValue(new NotFoundException());

      await expect(controller.getOrderById(999, { user: { role: UserRole.CUSTOMER } }))
        .rejects
        .toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not authorized', async () => {
      mockOrderService.getOrderById.mockRejectedValue(new ForbiddenException());

      await expect(controller.getOrderById(1, { user: { role: UserRole.CUSTOMER, id: 2 } }))
        .rejects
        .toThrow(ForbiddenException);
    });
  });
});
