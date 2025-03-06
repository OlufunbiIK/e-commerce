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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let Payment = class Payment {
};
exports.Payment = Payment;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1',
        description: 'Unique identifier for the payment',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ref_123456789',
        description: 'Unique payment reference from Paystack',
        uniqueItems: true,
    }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Payment.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user@example.com',
        description: 'Email of the user making the payment',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Payment.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000.0,
        description: 'Amount paid (in Naira, stored as decimal)',
    }),
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'pending',
        description: 'Status of the payment (pending, success, failed)',
        default: 'pending',
    }),
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-03-01T12:00:00.000Z',
        description: 'Timestamp when the payment was created',
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)()
], Payment);
//# sourceMappingURL=payment.entity.js.map