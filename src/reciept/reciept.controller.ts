import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReceiptService } from './reciept.service';

@ApiTags('Receipts') // Groups endpoints under "Receipts" in Swagger UI
@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  /** Get a receipt by reference */
  @ApiOperation({ summary: 'Get a receipt by reference' })
  @ApiResponse({ status: 200, description: 'Receipt retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Receipt not found.' })
  @ApiParam({
    name: 'reference',
    required: true,
    description: 'Transaction reference',
  })
  @Get(':reference')
  async getReceipt(@Param('reference') reference: string) {
    return this.receiptService.getReceipt(reference);
  }

  /** Send a receipt email */
  @ApiOperation({ summary: 'Send a receipt via email' })
  @ApiResponse({ status: 200, description: 'Receipt email sent successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  @Post('email')
  async sendReceiptEmail(@Body() body: { reference: string; email: string }) {
    await this.receiptService.sendReceiptEmail(body.reference, body.email);
    return { message: 'Receipt email sent successfully' };
  }

  /** Generate and download a PDF receipt */
  @ApiOperation({ summary: 'Generate and download a PDF receipt' })
  @ApiResponse({
    status: 200,
    description: 'PDF generated and sent successfully.',
  })
  @ApiResponse({ status: 404, description: 'Receipt not found.' })
  @ApiParam({
    name: 'reference',
    required: true,
    description: 'Transaction reference',
  })
  @Get('pdf/:reference')
  async generateReceiptPDF(
    @Param('reference') reference: string,
    @Res() res: Response,
  ) {
    await this.receiptService.generateReceiptPDF(reference, res);
  }
}
