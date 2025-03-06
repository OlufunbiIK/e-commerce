import { PaystackService } from './paystack-service.service';
export declare class PaystackController {
    private readonly paystackService;
    constructor(paystackService: PaystackService);
    initializePayment(req: Request, body: any): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
    refundPayment(body: any): Promise<any>;
    getAllTransactions(): Promise<any>;
    cancelTransaction(body: {
        reference: string;
    }): Promise<any>;
    handleWebhook(req: any, res: any, signature: string): Promise<any>;
}
