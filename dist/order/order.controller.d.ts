import { OrderService } from './order.service';
import { OrderStatus } from './enum/orderStatus.enum';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(body: any): Promise<import("./entities/order.entity").Order>;
    updateOrderStatus(orderId: number, status: OrderStatus, req: any): Promise<import("./entities/order.entity").Order>;
    getOrderById(orderId: number, req: any): Promise<import("./entities/order.entity").Order>;
    getUserOrders(userId: number, req: any): Promise<import("./entities/order.entity").Order[]>;
    getAllOrders(): Promise<import("./entities/order.entity").Order[]>;
    getSellerOrders(sellerId: number, req: any): Promise<import("./entities/order.entity").Order[]>;
}
