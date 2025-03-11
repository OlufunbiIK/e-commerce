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
exports.CreateCartDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const cartStatus_enum_1 = require("../enum/cartStatus.enum");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const cart_items_entity_1 = require("../../cart-items/entities/cart-items.entity");
class CreateCartDto {
}
exports.CreateCartDto = CreateCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier of the cart',
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the product being added to the cart',
        example: 101,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User who owns the cart',
        type: () => user_entity_1.User,
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.carts),
    __metadata("design:type", user_entity_1.User)
], CreateCartDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Quantity of the product in the cart',
        example: 2,
    }),
    (0, typeorm_1.OneToMany)(() => cart_items_entity_1.CartItem, (cartItem) => cartItem.cart, { cascade: true }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCartDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Status of the cart (active, checked_out, abandoned)',
        enum: cartStatus_enum_1.CartStatus,
        example: cartStatus_enum_1.CartStatus.ACTIVE,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(cartStatus_enum_1.CartStatus, {
        message: 'Status must be active, checked_out, or abandoned',
    }),
    __metadata("design:type", String)
], CreateCartDto.prototype, "status", void 0);
//# sourceMappingURL=create-cart.dto.js.map