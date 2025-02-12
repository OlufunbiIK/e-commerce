import { IsNumber, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  orderId: number;

  @IsString()
  paymentMethod: string;

  @IsNumber()
  totalAmount: number;
}
