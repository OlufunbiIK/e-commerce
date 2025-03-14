import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaystackService } from './paystack-service.service';
import { PaystackController } from './paystack-controller.controller';
import { ReceiptModule } from 'src/reciept/reciept.module';

@Module({
  imports: [
    ReceiptModule,
    TypeOrmModule.forFeature([Payment]), // Register the Payment entity
  ],
  controllers: [PaystackController],
  providers: [PaystackService],
  exports: [PaystackService],
})
export class PaystackModule {
  constructor(private dataSource: DataSource) {} // Inject DataSource
}
