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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createOrder(userId: number, totalPrice: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const order = this.orderRepository.create({
      user, // Use the actual user entity
      totalPrice,
      status: OrderStatus.PENDING,
    });

    return this.orderRepository.save(order);
  }

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

  // ✅ Get all orders for a specific user
  async getUserOrders(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'orderItems', 'orderItems.product'],
      order: { id: 'DESC' }, // Sort orders by most recent
    });
  }

  // ✅ Get all orders (Admin only)
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product'],
      order: { id: 'DESC' },
    });
  }

  // filter orders based on the seller’s products.
  async getSellerOrders(sellerId: number): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .where('product.sellerId = :sellerId', { sellerId })
      .orderBy('order.createdAt', 'DESC')
      .getMany();
  }
  
}
