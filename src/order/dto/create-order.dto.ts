import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderStatus.enum';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID of the user placing the order',
    example: 123,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: 'Total price of the order',
    example: 299.99,
  })
  @IsPositive()
  totalPrice: number;

  @ApiProperty({
    description: 'Current status of the order',
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderStatus, {
    message:
      'Status must be pending, processing, shipped, delivered, or cancelled',
  })
  status?: OrderStatus;
}
