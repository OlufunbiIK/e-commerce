import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Req,
  Headers,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaystackService } from './paystack-service.service';
import { UserRole } from 'src/user/enum/userRole.enum';
import * as crypto from 'crypto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Paystack') // Grouping endpoints under Paystack
@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @ApiOperation({ summary: 'Initialize a Payment' })
  @ApiResponse({ status: 200, description: 'Payment initialized successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
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

  @ApiOperation({ summary: 'Verify Payment by Reference' })
  @ApiResponse({ status: 200, description: 'Payment verified successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @Get('verify/reference')
  async verifyPayment(@Query('reference') reference: string) {
    return this.paystackService.verifyPayment(reference);
  }

  @ApiOperation({ summary: 'Refund a Payment' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Payment refunded successfully' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  @Roles(UserRole.ADMIN)
  @Post('refund')
  async refundPayment(@Body() body) {
    return this.paystackService.refundPayment(body.transactionId);
  }

  @ApiOperation({ summary: 'Get All Transactions' })
  @ApiResponse({
    status: 200,
    description: 'Transactions fetched successfully',
  })
  @Get('transactions')
  async getAllTransactions() {
    return this.paystackService.getAllTransactions();
  }

  @ApiOperation({ summary: 'Cancel Transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction cancelled successfully',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Post('cancel')
  async cancelTransaction(@Body() body: { reference: string }) {
    return this.paystackService.cancelTransaction(body.reference);
  }

  @ApiOperation({ summary: 'Webhook Endpoint for Payment Notifications' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid signature' })
  @Post('webhook')
  async handleWebhook(
    @Req() req,
    @Res() res,
    @Headers('x-paystack-signature') signature: string,
  ) {
    const secret = process.env.PAYSTACK_SECRET;

    const expectedSignature = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    console.log('Webhook verified:', req.body);
    return res.status(200).json({ message: 'Webhook received' });
  }
}
