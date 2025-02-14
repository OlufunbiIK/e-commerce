import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { OrderItemStatus } from '../enum/orderItemStatus.enum';

export class CreateOrderItemDto {
  @IsInt()
  @IsPositive()
  orderId: number;

  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsOptional() // This allows the field to be optional in requests
  @IsEnum(OrderItemStatus, {
    message: 'Status must be in_stock, out_of_stock, or backordered',
  })
  status?: OrderItemStatus;
}
