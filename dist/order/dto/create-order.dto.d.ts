import { OrderStatus } from '../enum/orderStatus.enum';
export declare class CreateOrderDto {
    userId: number;
    totalPrice: number;
    status?: OrderStatus;
}
