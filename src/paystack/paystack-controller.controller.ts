import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Req,
  Headers,
  Res,
  //   Req,
  //   Res,
  //   Headers,
} from '@nestjs/common';
import { PaystackService } from './paystack-service.service';
// import { Request, Response } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';
import * as crypto from 'crypto';

// import { InitializePaymentDto } from './entities/initialize-payment-dto.dto';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  //   @Post('initialize')
  //   async initializePayment(@Body() body: InitializePaymentDto) {
  //     console.log('Received Request Body:', body); // Debugging log
  //     return this.paystackService.initializePayment(body.email, body.amount);
  //   }

  @Post('initialize')
  async initializePayment(@Req() req: Request, @Body() body: any) {
    console.log('🚀 Raw Request Body:', req.body);
    console.log('📌 Parsed Body:', body);
    console.log('🔍 Headers:', req.headers);
    console.log('🛠️ Content-Type:', req.headers['content-type']);

    if (!body.email || !body.amount) {
      console.error('❌ Missing email or amount in request body');
      return { error: 'Email and Amount are required' };
    }

    return this.paystackService.initializePayment(body.email, body.amount);
  }

  @Get('verify/reference')
  async verifyPayment(@Query('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }

  @Post('refund')
  @Roles(UserRole.ADMIN) // Restrict to Admin
  async refundPayment(@Body() body) {
    return this.paystackService.refundPayment(body.transactionId);
  }

  @Get('transactions')
  async getAllTransactions() {
    return this.paystackService.getAllTransactions();
  }

  @Post('cancel')
  async cancelTransaction(@Body() body: { reference: string }) {
    return this.paystackService.cancelTransaction(body.reference);
  }

  //   @Post('webhook')
  //   async handleWebhook(
  //     @Req() req: Request,
  //     @Headers('x-paystack-signature') signature: string,
  //   ) {
  //     return this.paystackService.handleWebhook(req.body, signature);
  //   }

  @Post('webhook')
  async handleWebhook(
    @Req() req,
    @Res() res,
    @Headers('x-paystack-signature') signature: string, // Get Paystack signature
  ) {
    const secret = process.env.PAYSTACK_SECRET; // Your Paystack Secret Key

    // Compute HMAC SHA512 signature
    const expectedSignature = crypto
      .createHmac('sha512', secret) // HMAC_SHA512(secret_key, data)
      .update(JSON.stringify(req.body)) // Hash the request body
      .digest('hex'); // Convert to hexadecimal

    // Compare signatures
    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    // ✅ Signature is valid → Process the webhook
    console.log('Webhook verified:', req.body);

    return res.status(200).json({ message: 'Webhook received' });
  }
}
