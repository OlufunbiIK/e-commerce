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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const reciept_service_1 = require("../reciept/reciept.service");
let PaystackService = class PaystackService {
    constructor(configService, dataSource, paymentRepository, receiptService) {
        this.configService = configService;
        this.dataSource = dataSource;
        this.paymentRepository = paymentRepository;
        this.receiptService = receiptService;
        this.PAYSTACK_SECRET = this.configService.get('PAYSTACK_SECRET');
    }
    async initializePayment(email, amount) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            console.log(`Initializing payment for: ${email}, Amount: ${amount}`);
            const amountInKobo = amount * 100;
            console.log(`Converted amount: ${amountInKobo} kobo`);
            const response = await axios_1.default.post('https://api.paystack.co/transaction/initialize', { email, amount: amountInKobo }, {
                headers: {
                    Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Paystack Response:', response.data);
            const newPayment = queryRunner.manager.create(payment_entity_1.Payment, {
                reference: response.data.data.reference,
                email,
                amount: amountInKobo,
                status: 'pending',
            });
            await queryRunner.manager.save(payment_entity_1.Payment, newPayment);
            await queryRunner.commitTransaction();
            console.log('Transaction saved successfully');
            return response.data;
        }
        catch (error) {
            console.error('Paystack Error:', error.response?.data || error.message);
            await queryRunner.rollbackTransaction();
            throw new Error(error.response?.data?.message || 'Failed to initialize payment');
        }
        finally {
            await queryRunner.release();
        }
    }
    async verifyPayment(reference) {
        const url = `https://api.paystack.co/transaction/verify/${reference}`;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
                    'Content-Type': 'application/json',
                },
            });
            const payment = await this.paymentRepository.findOne({
                where: { reference },
            });
            if (!payment)
                throw new Error('Transaction not found in database');
            payment.status = response.data.data.status;
            await queryRunner.manager.save(payment);
            if (payment.status === 'success') {
                await this.receiptService.createReceipt({
                    userId: payment.id,
                    reference: payment.reference,
                    amount: payment.amount,
                    status: payment.status,
                });
            }
            await queryRunner.commitTransaction();
            return response.data;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(error.response?.data?.message || 'Failed to verify payment');
        }
        finally {
            await queryRunner.release();
        }
    }
    async refundPayment(transactionId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const response = await axios_1.default.post(`https://api.paystack.co/refund`, { transaction: transactionId }, {
                headers: {
                    Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
                    'Content-Type': 'application/json',
                },
            });
            const payment = await this.paymentRepository.findOne({
                where: { reference: transactionId },
            });
            if (!payment)
                throw new Error('Transaction not found');
            payment.status = 'refunded';
            await queryRunner.manager.save(payment);
            await queryRunner.commitTransaction();
            return response.data;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(error.response?.data?.message || 'Refund failed');
        }
        finally {
            await queryRunner.release();
        }
    }
    verifyWebhook(req, signature) {
        const secret = this.PAYSTACK_SECRET;
        const crypto = require('crypto');
        const hash = crypto
            .createHmac('sha512', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        return hash === signature;
    }
    async getAllTransactions() {
        return this.paymentRepository.find();
    }
    async cancelTransaction(reference) {
        const payment = await this.paymentRepository.findOne({
            where: { reference },
        });
        if (!payment)
            throw new Error('Transaction not found');
        if (payment.status !== 'pending')
            throw new Error('Transaction cannot be canceled');
        payment.status = 'canceled';
        return this.paymentRepository.save(payment);
    }
    async handleWebhook(payload, signature) {
        if (!this.verifyWebhook(payload, signature)) {
            throw new Error('Invalid webhook signature');
        }
        const reference = payload.data.reference;
        const payment = await this.paymentRepository.findOne({
            where: { reference },
        });
        if (!payment)
            throw new Error('Transaction not found');
        payment.status = payload.data.status;
        return this.paymentRepository.save(payment);
    }
};
exports.PaystackService = PaystackService;
exports.PaystackService = PaystackService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, reciept_service_1.ReceiptService])
], PaystackService);
//# sourceMappingURL=paystack-service.service.js.map