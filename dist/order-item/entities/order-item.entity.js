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
exports.OrderItem = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../order/entities/order.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const orderItemStatus_enum_1 = require("../enum/orderItemStatus.enum");
let OrderItem = class OrderItem {
};
exports.OrderItem = OrderItem;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Unique identifier for the order item',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The order associated with this order item',
        type: () => order_entity_1.Order,
    }),
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.orderItems),
    __metadata("design:type", order_entity_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The product associated with this order item',
        type: () => product_entity_1.Product,
    }),
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.orderItems, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", product_entity_1.Product)
], OrderItem.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: 'Quantity of the product in the order',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'in_stock',
        description: 'The status of the order item',
        enum: orderItemStatus_enum_1.OrderItemStatus,
        default: orderItemStatus_enum_1.OrderItemStatus.IN_STOCK,
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: orderItemStatus_enum_1.OrderItemStatus,
        default: orderItemStatus_enum_1.OrderItemStatus.IN_STOCK,
    }),
    __metadata("design:type", String)
], OrderItem.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1500.5,
        description: 'Price per unit of the product in the order',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)()
], OrderItem);
//# sourceMappingURL=order-item.entity.js.map