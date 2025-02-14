import { IsInt, IsPositive, IsOptional, IsString, IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderStatus.enum';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  userId: number;      

  @IsPositive()
  totalPrice: number;

  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Status must be pending, processing, shipped, delivered, or cancelled' })
  status?: OrderStatus;  
}

  