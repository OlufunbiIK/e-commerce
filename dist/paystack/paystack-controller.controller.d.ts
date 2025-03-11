import { PaystackService } from './paystack-service.service';
export declare class PaystackController {
    private readonly paystackService;
    constructor(paystackService: PaystackService);
    initializePayment(req: Request, body: any): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
    refundPayment(body: any): Promise<any>;
    getAllTransactions(): Promise<import("./entities/payment.entity").Payment[]>;
    cancelTransaction(body: {
        reference: string;
    }): Promise<import("./entities/payment.entity").Payment>;
    handleWebhook(req: any, res: any, signature: string): Promise<any>;
}
