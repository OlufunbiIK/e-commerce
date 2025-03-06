import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderItemStatus } from '../enum/orderItemStatus.enum';
export declare class OrderItem {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    status: OrderItemStatus;
    price: number;
}
