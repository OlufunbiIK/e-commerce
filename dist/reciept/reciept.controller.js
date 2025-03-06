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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const reciept_service_1 = require("./reciept.service");
let ReceiptController = class ReceiptController {
    constructor(receiptService) {
        this.receiptService = receiptService;
    }
    async getReceipt(reference) {
        return this.receiptService.getReceipt(reference);
    }
    async sendReceiptEmail(body) {
        await this.receiptService.sendReceiptEmail(body.reference, body.email);
        return { message: 'Receipt email sent successfully' };
    }
    async generateReceiptPDF(reference, res) {
        await this.receiptService.generateReceiptPDF(reference, res);
    }
};
exports.ReceiptController = ReceiptController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a receipt by reference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipt retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Receipt not found.' }),
    (0, swagger_1.ApiParam)({
        name: 'reference',
        required: true,
        description: 'Transaction reference',
        example: 'abc123ref',
    }),
    (0, common_1.Get)(':reference'),
    __param(0, (0, common_1.Param)('reference')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReceiptController.prototype, "getReceipt", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Send a receipt via email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Receipt email sent successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid request body.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                reference: {
                    type: 'string',
                    description: 'Transaction reference of the receipt',
                    example: 'abc123ref',
                },
                email: {
                    type: 'string',
                    description: 'Recipient email address',
                    example: 'customer@example.com',
                },
            },
            required: ['reference', 'email'],
        },
    }),
    (0, common_1.Post)('email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReceiptController.prototype, "sendReceiptEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Generate and download a PDF receipt' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'PDF generated and sent successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Receipt not found.' }),
    (0, swagger_1.ApiParam)({
        name: 'reference',
        required: true,
        description: 'Transaction reference for the receipt',
        example: 'abc123ref',
    }),
    (0, common_1.Get)('pdf/:reference'),
    __param(0, (0, common_1.Param)('reference')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ReceiptController.prototype, "generateReceiptPDF", null);
exports.ReceiptController = ReceiptController = __decorate([
    (0, swagger_1.ApiTags)('Receipts'),
    (0, common_1.Controller)('receipt'),
    __metadata("design:paramtypes", [reciept_service_1.ReceiptService])
], ReceiptController);
//# sourceMappingURL=reciept.controller.js.map