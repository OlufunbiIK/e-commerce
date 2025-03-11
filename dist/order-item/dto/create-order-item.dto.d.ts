import { OrderItemStatus } from '../enum/orderItemStatus.enum';
export declare class CreateOrderItemDto {
    orderId: number;
    productId: number;
    quantity: number;
    status?: OrderItemStatus;
    price: number;
}
