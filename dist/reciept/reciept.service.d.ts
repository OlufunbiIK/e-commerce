import { Repository } from 'typeorm';
import { Response } from 'express';
import { Receipt } from './entities/reciept.entity';
export declare class ReceiptService {
    private readonly receiptRepo;
    constructor(receiptRepo: Repository<Receipt>);
    getReceipt(reference: string): Promise<any>;
    createReceipt(data: {
        userId: string;
        reference: string;
        amount: number;
        status: string;
    }): Promise<any>;
    sendReceiptEmail(reference: string, email: string): Promise<void>;
    generateReceiptPDF(reference: string, res: Response): Promise<void>;
}
