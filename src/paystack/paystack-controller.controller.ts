import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import { PaystackService } from './paystack-service.service';
import { Request, Response } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  async initializePayment(@Body() body) {
    return this.paystackService.initializePayment(body.email, body.amount);
  }
  @Get('verify/reference')
  async verifyPayment(@Query('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }

  @Post('webhook')
  async paystackWebhook(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
    @Headers('x-paystack-signature') signature: string,
  ) {
    if (!this.paystackService.verifyWebhook(req, signature)) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const event = body;
    console.log('Webhook event received:', event);

    if (event.event === 'charge.success') {
      await this.paystackService.verifyPayment(event.data.reference);
    }

    return res.status(200).json({ message: 'Webhook received' });
  }

  @Post('refund')
  @Roles(UserRole.ADMIN) // Restrict to Admin
  async refundPayment(@Body() body) {
    return this.paystackService.refundPayment(body.transactionId);
  }
}
