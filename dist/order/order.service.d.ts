import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enum/orderStatus.enum';
import { User } from '../user/entities/user.entity';
export declare class OrderService {
    private readonly orderRepository;
    private readonly userRepository;
    constructor(orderRepository: Repository<Order>, userRepository: Repository<User>);
    createOrder(userId: number, totalPrice: number): Promise<any>;
    updateOrderStatus(orderId: number, status: OrderStatus, adminUser: User): Promise<Order>;
    getOrderById(orderId: number, user: User): Promise<Order>;
    getUserOrders(userId: number): Promise<Order[]>;
    getAllOrders(): Promise<Order[]>;
    getSellerOrders(sellerId: number): Promise<Order[]>;
}
