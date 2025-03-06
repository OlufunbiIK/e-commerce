import { ConfigService } from '@nestjs/config';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { ReceiptService } from 'src/reciept/reciept.service';
export declare class PaystackService {
    private configService;
    private dataSource;
    private paymentRepository;
    private readonly receiptService;
    private readonly PAYSTACK_SECRET;
    constructor(configService: ConfigService, dataSource: DataSource, paymentRepository: Repository<Payment>, receiptService: ReceiptService);
    initializePayment(email: string, amount: number): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
    refundPayment(transactionId: string): Promise<any>;
    verifyWebhook(req: any, signature: string): boolean;
    getAllTransactions(): Promise<Payment[]>;
    cancelTransaction(reference: string): Promise<Payment>;
    handleWebhook(payload: any, signature: string): Promise<Payment>;
}
