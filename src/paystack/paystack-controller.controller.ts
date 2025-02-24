import { Controller, Post, Body, Query } from '@nestjs/common';
import { PaystackService } from './paystack-service.service';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  async initializePayment(@Body() body) {
    return this.paystackService.initializePayment(body.email, body.amount);
  }
  @Post('verify/reference')
  async verifyPayment(@Query('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }
}
