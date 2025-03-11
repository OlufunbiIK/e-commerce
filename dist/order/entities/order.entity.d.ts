import { User } from '../../user/entities/user.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { OrderStatus } from '../enum/orderStatus.enum';
export declare class Order {
    id: number;
    user: User;
    orderItems: OrderItem[];
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}
