import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

if (!PAYSTACK_SECRET) {
  throw new Error('Missing PAYSTACK_SECRET in environment variables');
}

export const createPaymentSession = async (req: Request, res: Response) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ message: 'Email and amount are required' });
  }

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email, amount: amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      },
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(
      'Error initializing payment:',
      error.response?.data || error.message,
    );
    res
      .status(500)
      .json({
        message: 'Failed to initialize payment',
        error: error.response?.data,
      });
  }
};
