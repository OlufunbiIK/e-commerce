import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CartStatus } from '../enum/cartStatus.enum';

export class CreateCartDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsOptional() // Optional field (default will be set in the entity)
  @IsEnum(CartStatus, {
    message: 'Status must be active, checked_out, or abandoned',
  })
  status?: CartStatus;
}
