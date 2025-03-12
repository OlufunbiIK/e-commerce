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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const cartStatus_enum_1 = require("../enum/cartStatus.enum");
const cart_items_entity_1 = require("../../cart-items/entities/cart-items.entity");
const swagger_1 = require("@nestjs/swagger");
let Cart = class Cart {
};
exports.Cart = Cart;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the cart',
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User who owns this cart',
        type: () => user_entity_1.User,
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.carts, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total quantity of products in the cart',
        example: 3,
    }),
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Cart.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the cart',
        enum: cartStatus_enum_1.CartStatus,
        example: cartStatus_enum_1.CartStatus.ACTIVE,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: cartStatus_enum_1.CartStatus, default: cartStatus_enum_1.CartStatus.ACTIVE }),
    __metadata("design:type", String)
], Cart.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_items_entity_1.CartItem, (cartItem) => cartItem.cart, {
        cascade: true,
        eager: true,
    }),
    (0, swagger_1.ApiProperty)({
        description: 'List of cart items',
        type: () => [cart_items_entity_1.CartItem],
    }),
    __metadata("design:type", Array)
], Cart.prototype, "cartItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total price of items in the cart',
        example: 150.5,
    }),
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], Cart.prototype, "totalPrice", void 0);
exports.Cart = Cart = __decorate([
    (0, typeorm_1.Entity)()
], Cart);
//# sourceMappingURL=cart.entity.js.map