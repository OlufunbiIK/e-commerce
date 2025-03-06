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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_service_ts_1 = require("./payment-service.service.ts");
const swagger_1 = require("@nestjs/swagger");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    createSession(body) {
        return this.paymentService.createPaymentSession(body.amount, body.email);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create a payment session',
        description: 'Initiates a payment session for the specified amount and email.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                amount: {
                    type: 'number',
                    example: 100.5,
                    description: 'Amount to be charged',
                },
                email: {
                    type: 'string',
                    example: 'user@example.com',
                    description: 'Email of the user making the payment',
                },
            },
        },
    }),
    (0, common_1.Post)('create-session'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "createSession", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('Payment'),
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_service_ts_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment-controller.controller.js.map