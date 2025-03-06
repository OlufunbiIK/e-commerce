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
exports.CartItem = void 0;
const cart_entity_1 = require("../../cart/entities/cart.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let CartItem = class CartItem {
};
exports.CartItem = CartItem;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the cart item',
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The cart to which this item belongs',
        type: () => cart_entity_1.Cart,
    }),
    (0, typeorm_1.ManyToOne)(() => cart_entity_1.Cart, (carts) => carts.cartItems, { onDelete: 'CASCADE' }),
    __metadata("design:type", cart_entity_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The product associated with this cart item',
        type: () => product_entity_1.Product,
    }),
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.cartItems),
    __metadata("design:type", product_entity_1.Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the product in the cart',
        example: 2,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price of the product at the time of adding to the cart',
        example: 19.99,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartItem.prototype, "price", void 0);
exports.CartItem = CartItem = __decorate([
    (0, typeorm_1.Entity)()
], CartItem);
//# sourceMappingURL=cart-items.entity.js.map