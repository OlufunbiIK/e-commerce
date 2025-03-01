/* eslint-disable @typescript-eslint/no-require-imports */
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import axios from 'axios';

// @Injectable()
// export class PaystackService {
//   private readonly PAYSTACK_SECRET: string;

//   constructor(private configService: ConfigService) {
//     this.PAYSTACK_SECRET = this.configService.get<string>('PAYSTACK_SECRET');
//     console.log('Paystack Secret:', this.PAYSTACK_SECRET);
//   }

//   async initializePayment(email: string, amount: number) {
//     try {
//       const response = await axios.post(
//         'https://api.paystack.co/transaction/initialize',
//         {
//           email,
//           amount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   }

//   async verifyPayment(reference: string) {
//     const url = `https://api.paystack.co/transaction/verify/${reference}`;

//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${this.PAYSTACK_SECRET.trim()}`, // Ensure no spaces
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('Paystack Response:', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Paystack Error:', error.response?.data || error.message);
//       throw new Error(
//         error.response?.data?.message || 'Failed to verify payment',
//       );
//     }
//   }

//   async refundPayment(transactionId: string) {
//     try {
//       const response = await axios.post(
//         `https://api.paystack.co/refund`,
//         { transaction: transactionId },
//         {
//           headers: {
//             Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
//             'Content-Type': 'application/json',
//           },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Refund failed');
//     }
//   }

//use in react
//   const verifyPayment = async (reference) => {
//     const response = await fetch(`http://localhost:3000/paystack/verify?reference=${reference}`, {
//       method: "POST",
//     });
//     const data = await response.json();
//     console.log("Payment Verification:", data);
//   };

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { ReceiptService } from 'src/reciept/reciept.service';

@Injectable()
export class PaystackService {
  private readonly PAYSTACK_SECRET: string;

  constructor(
    private configService: ConfigService,
    private dataSource: DataSource,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private readonly receiptService: ReceiptService,
  ) {
    this.PAYSTACK_SECRET = this.configService.get<string>('PAYSTACK_SECRET');
  }

  /** Initialize a Payment */
  async initializePayment(email: string, amount: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Log the incoming request
      console.log(`Initializing payment for: ${email}, Amount: ${amount}`);

      // Convert amount to kobo
      const amountInKobo = amount * 100;
      console.log(`Converted amount: ${amountInKobo} kobo`);

      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        { email, amount: amountInKobo },
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Paystack Response:', response.data);

      // Save transaction in database
      const newPayment = queryRunner.manager.create(Payment, {
        reference: response.data.data.reference,
        email,
        amount: amountInKobo,
        status: 'pending',
      });
      await queryRunner.manager.save(Payment, newPayment);

      await queryRunner.commitTransaction();
      console.log('Transaction saved successfully');

      return response.data;
    } catch (error) {
      console.error('Paystack Error:', error.response?.data || error.message);
      await queryRunner.rollbackTransaction();
      throw new Error(
        error.response?.data?.message || 'Failed to initialize payment',
      );
    } finally {
      await queryRunner.release();
    }
  }

  /** Verify a Payment and Generate a Receipt */
  async verifyPayment(reference: string) {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      });

      const payment = await this.paymentRepository.findOne({
        where: { reference },
      });

      if (!payment) throw new Error('Transaction not found in database');

      // Update payment status
      payment.status = response.data.data.status;
      await queryRunner.manager.save(payment);

      // ✅ Only create a receipt if the payment was successful
      if (payment.status === 'success') {
        await this.receiptService.createReceipt({
          userId: payment.id, // Make sure `userId` is correctly assigned (if needed)
          reference: payment.reference,
          amount: payment.amount,
          status: payment.status,
        });
      }

      await queryRunner.commitTransaction();
      return response.data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(
        error.response?.data?.message || 'Failed to verify payment',
      );
    } finally {
      await queryRunner.release();
    }
  }

  /** Handle Refund */
  async refundPayment(transactionId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const response = await axios.post(
        `https://api.paystack.co/refund`,
        { transaction: transactionId },
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        },
      );

      // Update payment status
      const payment = await this.paymentRepository.findOne({
        where: { reference: transactionId },
      });
      if (!payment) throw new Error('Transaction not found');

      payment.status = 'refunded';
      await queryRunner.manager.save(payment);

      await queryRunner.commitTransaction();
      return response.data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error.response?.data?.message || 'Refund failed');
    } finally {
      await queryRunner.release();
    }
  }

  /** Verify Webhook */
  verifyWebhook(req: any, signature: string): boolean {
    const secret = this.PAYSTACK_SECRET;
    const crypto = require('crypto');
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    return hash === signature;
  }

  async getAllTransactions() {
    return this.paymentRepository.find();
  }

  async cancelTransaction(reference: string) {
    const payment = await this.paymentRepository.findOne({
      where: { reference },
    });
    if (!payment) throw new Error('Transaction not found');
    if (payment.status !== 'pending')
      throw new Error('Transaction cannot be canceled');

    payment.status = 'canceled';
    return this.paymentRepository.save(payment);
  }

  async handleWebhook(payload: any, signature: string) {
    if (!this.verifyWebhook(payload, signature)) {
      throw new Error('Invalid webhook signature');
    }

    const reference = payload.data.reference;
    const payment = await this.paymentRepository.findOne({
      where: { reference },
    });
    if (!payment) throw new Error('Transaction not found');

    payment.status = payload.data.status;
    return this.paymentRepository.save(payment);
  }
}
