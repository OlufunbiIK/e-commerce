import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment-service.service.ts';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-session')
  createSession(@Body() body) {
    return this.paymentService.createPaymentSession(body.amount, body.email);
  }
}
