import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReceiptService } from './reciept.service';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  /** Get a receipt by reference */
  @Get(':reference')
  async getReceipt(@Param('reference') reference: string) {
    return this.receiptService.getReceipt(reference);
  }

  /** Send a receipt email */
  //   POST http://localhost:3000/receipt/email
  // {
  //   "reference": "txn_123456",
  //   "email": "user@example.com"
  // }

  @Post('email')
  async sendReceiptEmail(@Body() body: { reference: string; email: string }) {
    await this.receiptService.sendReceiptEmail(body.reference, body.email);
    return { message: 'Receipt email sent successfully' };
  }

  /** Generate and download a PDF receipt */
  // GET http://localhost:3000/receipt/pdf/txn_123456

  @Get('pdf/:reference')
  async generateReceiptPDF(
    @Param('reference') reference: string,
    @Res() res: Response,
  ) {
    await this.receiptService.generateReceiptPDF(reference, res);
  }
}
