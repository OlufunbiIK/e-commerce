import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  private paystackSecret = process.env.PAYSTACK_SECRET_KEY;

  async createPaymentSession(amount: number, email: string) {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email, amount: amount * 100 },
      { headers: { Authorization: `Bearer ${this.paystackSecret}` } },
    );

    return response.data;
  }
}
