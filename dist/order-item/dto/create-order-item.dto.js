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
exports.CreateOrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const orderItemStatus_enum_1 = require("../enum/orderItemStatus.enum");
class CreateOrderItemDto {
}
exports.CreateOrderItemDto = CreateOrderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 101,
        description: 'Unique identifier for the order',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Unique identifier for the product being ordered',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: 'Quantity of the product ordered',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'in_stock',
        description: 'Status of the order item',
        enum: orderItemStatus_enum_1.OrderItemStatus,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(orderItemStatus_enum_1.OrderItemStatus, {
        message: 'Status must be in_stock, out_of_stock, or backordered',
    }),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1500.5,
        description: 'Price per unit of the product ordered',
    }),
    (0, class_validator_1.IsDecimal)({ force_decimal: true, decimal_digits: '1,2' }),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "price", void 0);
//# sourceMappingURL=create-order-item.dto.js.map