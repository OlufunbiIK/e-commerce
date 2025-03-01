import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment-service.service.ts';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({
    summary: 'Create a payment session',
    description:
      'Initiates a payment session for the specified amount and email.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
          example: 100.5,
          description: 'Amount to be charged',
        },
        email: {
          type: 'string',
          example: 'user@example.com',
          description: 'Email of the user making the payment',
        },
      },
    },
  })
  @Post('create-session')
  createSession(@Body() body) {
    return this.paymentService.createPaymentSession(body.amount, body.email);
  }
}
