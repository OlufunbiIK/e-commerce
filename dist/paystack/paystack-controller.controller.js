"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const paystack_service_service_1 = require("./paystack-service.service");
const userRole_enum_1 = require("../user/enum/userRole.enum");
const crypto = require("crypto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PaystackController = class PaystackController {
    constructor(paystackService) {
        this.paystackService = paystackService;
    }
    async initializePayment(req, body) {
        console.log('🚀 Raw Request Body:', req.body);
        console.log('📌 Parsed Body:', body);
        console.log('🔍 Headers:', req.headers);
        console.log('🛠️ Content-Type:', req.headers['content-type']);
        if (!body.email || !body.amount) {
            console.error('❌ Missing email or amount in request body');
            return { error: 'Email and Amount are required' };
        }
        return this.paystackService.initializePayment(body.email, body.amount);
    }
    async verifyPayment(reference) {
        return this.paystackService.verifyPayment(reference);
    }
    async refundPayment(body) {
        return this.paystackService.refundPayment(body.transactionId);
    }
    async getAllTransactions() {
        return this.paystackService.getAllTransactions();
    }
    async cancelTransaction(body) {
        return this.paystackService.cancelTransaction(body.reference);
    }
    async handleWebhook(req, res, signature) {
        const secret = process.env.PAYSTACK_SECRET;
        const expectedSignature = crypto
            .createHmac('sha512', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        if (signature !== expectedSignature) {
            return res.status(401).json({ message: 'Invalid signature' });
        }
        console.log('Webhook verified:', req.body);
        return res.status(200).json({ message: 'Webhook received' });
    }
};
exports.PaystackController = PaystackController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Initialize a Payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment initialized successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request body' }),
    (0, common_1.Post)('initialize'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "initializePayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verify Payment by Reference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment verified successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payment not found' }),
    (0, common_1.Get)('verify/reference'),
    __param(0, (0, common_1.Query)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "verifyPayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refund a Payment' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment refunded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Unauthorized' }),
    (0, roles_decorator_1.Roles)(userRole_enum_1.UserRole.ADMIN),
    (0, common_1.Post)('refund'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "refundPayment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Transactions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transactions fetched successfully',
    }),
    (0, common_1.Get)('transactions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "getAllTransactions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cancel Transaction' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Transaction cancelled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Transaction not found' }),
    (0, common_1.Post)('cancel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "cancelTransaction", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Webhook Endpoint for Payment Notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook processed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid signature' }),
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)('x-paystack-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaystackController.prototype, "handleWebhook", null);
exports.PaystackController = PaystackController = __decorate([
    (0, swagger_1.ApiTags)('Paystack'),
    (0, common_1.Controller)('paystack'),
    __metadata("design:paramtypes", [paystack_service_service_1.PaystackService])
], PaystackController);
//# sourceMappingURL=paystack-controller.controller.js.map