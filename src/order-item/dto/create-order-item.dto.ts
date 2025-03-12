import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderItemStatus } from '../enum/orderItemStatus.enum';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 101,
    description: 'Unique identifier for the order',
  })
  @IsInt()
  @IsPositive()
  orderId: number;

  @ApiProperty({
    example: 20,
    description: 'Unique identifier for the product being ordered',
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    example: 3,
    description: 'Quantity of the product ordered',
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiPropertyOptional({
    example: 'in_stock',
    description: 'Status of the order item',
    enum: OrderItemStatus,
  })
  @IsOptional()
  @IsEnum(OrderItemStatus, {
    message: 'Status must be in_stock, out_of_stock, or backordered',
  })
  status?: OrderItemStatus;

  @ApiProperty({
    example: 1500.5,
    description: 'Price per unit of the product ordered',
  })
  @IsDecimal({ force_decimal: true, decimal_digits: '1,2' }) // ✅ Ensures it's a decimal
  @IsPositive() // ✅ Ensures it's greater than zero
  price: number;
}
