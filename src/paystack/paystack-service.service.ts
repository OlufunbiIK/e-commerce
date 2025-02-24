import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaystackService {
  private readonly PAYSTACK_SECRET: string;

  constructor(private configService: ConfigService) {
    this.PAYSTACK_SECRET = this.configService.get<string>('PAYSTACK_SECRET');
  }

  async initializePayment(email: string, amount: number) {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          email,
          amount: amount * 100, // Convert to kobo (smallest currency unit)
        },
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
  async verifyPayment(reference: string) {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }

  //use in react
  //   const verifyPayment = async (reference) => {
  //     const response = await fetch(`http://localhost:3000/paystack/verify?reference=${reference}`, {
  //       method: "POST",
  //     });
  //     const data = await response.json();
  //     console.log("Payment Verification:", data);
  //   };
}
