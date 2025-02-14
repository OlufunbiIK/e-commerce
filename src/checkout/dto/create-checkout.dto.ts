import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from '../enum/paymentStatus.enum';
import { CheckoutStatus } from '../enum/checkoutStatus.enum';

export class CreateCheckoutDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  orderId: number;

  @IsString()
  paymentMethod: string;

  @IsNumber()
  totalAmount: number;


  @IsEnum(CheckoutStatus, { message: 'Status must be pending, completed, failed, or refunded' })
  checkoutStatus: CheckoutStatus;

  @IsEnum(PaymentStatus, { message: 'Status must be initiated, payment_successful, or payment_failed' })
  paymentStatus: PaymentStatus;
}
