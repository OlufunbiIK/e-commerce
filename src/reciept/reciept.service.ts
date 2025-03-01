import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { Receipt } from './entities/reciept.entity';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
  ) {}

  /** Get a receipt by reference */
  async getReceipt(reference: string) {
    const receipt = await this.receiptRepo.findOne({ where: { reference } });
    if (!receipt) throw new Error('Receipt not found');
    return receipt;
  }
  async createReceipt(data: {
    userId: string;
    reference: string;
    amount: number;
    status: string;
  }) {
    const receipt = this.receiptRepo.create(data);
    return await this.receiptRepo.save(receipt);
  }

  /** Send a payment receipt email */
  async sendReceiptEmail(reference: string, email: string) {
    const receipt = await this.receiptRepo.findOne({ where: { reference } });
    if (!receipt) throw new Error('Receipt not found');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: 'no-reply@yourapp.com',
      to: email,
      subject: 'Your Payment Receipt',
      text: `Your payment of $${(receipt.amount / 100).toFixed(2)} was successful.`,
    };

    await transporter.sendMail(mailOptions);
  }

  /** Generate and download a PDF receipt */
  async generateReceiptPDF(reference: string, res: Response) {
    const receipt = await this.receiptRepo.findOne({ where: { reference } });
    if (!receipt) {
      res.status(404).json({ message: 'Receipt not found' });
      return;
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=receipt-${reference}.pdf`,
    );

    doc.pipe(res);
    doc.fontSize(18).text('Payment Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Transaction Reference: ${reference}`);
    doc.text(`Amount: $${(receipt.amount / 100).toFixed(2)}`);
    doc.text(`Status: ${receipt.status}`);
    doc.moveDown();
    doc.end();
  }
}
