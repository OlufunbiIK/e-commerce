import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enum/orderStatus.enum';
import { User } from '../user/entities/user.entity';
import { UserRole } from 'src/user/enum/userRole.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async updateOrderStatus(
    orderId: number,
    status: OrderStatus,
    adminUser: User,
  ): Promise<Order> {
    if (adminUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can update order statuses.');
    }

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    order.status = status;
    return await this.orderRepository.save(order);
  }

  async getOrderById(orderId: number, user: User): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    if (user.role !== UserRole.ADMIN && order.user.id !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to view this order.',
      );
    }

    return order;
  }
}
