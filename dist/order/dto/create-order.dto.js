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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const orderStatus_enum_1 = require("../enum/orderStatus.enum");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user placing the order',
        example: 123,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total price of the order',
        example: 299.99,
    }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the order',
        enum: orderStatus_enum_1.OrderStatus,
        example: orderStatus_enum_1.OrderStatus.PENDING,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(orderStatus_enum_1.OrderStatus, {
        message: 'Status must be pending, processing, shipped, delivered, or cancelled',
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
//# sourceMappingURL=create-order.dto.js.map