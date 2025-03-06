import { Response } from 'express';
import { ReceiptService } from './reciept.service';
export declare class ReceiptController {
    private readonly receiptService;
    constructor(receiptService: ReceiptService);
    getReceipt(reference: string): Promise<any>;
    sendReceiptEmail(body: {
        reference: string;
        email: string;
    }): Promise<{
        message: string;
    }>;
    generateReceiptPDF(reference: string, res: Response): Promise<void>;
}
