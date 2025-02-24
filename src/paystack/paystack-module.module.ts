import { Module } from '@nestjs/common';
import { PaystackController } from './paystack-controller.controller';
import { PaystackService } from './paystack-service.service';

@Module({
  controllers: [PaystackController],
  providers: [PaystackService],
  exports: [PaystackService],
})
export class PaystackModule {}
