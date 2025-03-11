import { PaymentService } from './payment-service.service.ts';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createSession(body: any): Promise<any>;
}
