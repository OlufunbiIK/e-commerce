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
exports.ReceiptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nodemailer_1 = require("nodemailer");
const pdfkit_1 = require("pdfkit");
const reciept_entity_1 = require("./entities/reciept.entity");
let ReceiptService = class ReceiptService {
    constructor(receiptRepo) {
        this.receiptRepo = receiptRepo;
    }
    async getReceipt(reference) {
        const receipt = await this.receiptRepo.findOne({ where: { reference } });
        if (!receipt)
            throw new Error('Receipt not found');
        return receipt;
    }
    async createReceipt(data) {
        const receipt = this.receiptRepo.create(data);
        return await this.receiptRepo.save(receipt);
    }
    async sendReceiptEmail(reference, email) {
        const receipt = await this.receiptRepo.findOne({ where: { reference } });
        if (!receipt)
            throw new Error('Receipt not found');
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        const mailOptions = {
            from: 'no-reply@yourapp.com',
            to: email,
            subject: 'Your Payment Receipt',
            text: `Your payment of $${(receipt.amount / 100).toFixed(2)} was successful.`,
        };
        await transporter.sendMail(mailOptions);
    }
    async generateReceiptPDF(reference, res) {
        const receipt = await this.receiptRepo.findOne({ where: { reference } });
        if (!receipt) {
            res.status(404).json({ message: 'Receipt not found' });
            return;
        }
        const doc = new pdfkit_1.default();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=receipt-${reference}.pdf`);
        doc.pipe(res);
        doc.fontSize(18).text('Payment Receipt', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Transaction Reference: ${reference}`);
        doc.text(`Amount: $${(receipt.amount / 100).toFixed(2)}`);
        doc.text(`Status: ${receipt.status}`);
        doc.moveDown();
        doc.end();
    }
};
exports.ReceiptService = ReceiptService;
exports.ReceiptService = ReceiptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reciept_entity_1.Receipt)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ReceiptService);
//# sourceMappingURL=reciept.service.js.map