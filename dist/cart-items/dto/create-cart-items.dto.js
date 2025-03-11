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
exports.CreateCartItemsDto = void 0;
const class_validator_1 = require("class-validator");
const cart_entity_1 = require("../../cart/entities/cart.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateCartItemsDto {
}
exports.CreateCartItemsDto = CreateCartItemsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The cart to which the item belongs',
        type: () => cart_entity_1.Cart,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", cart_entity_1.Cart)
], CreateCartItemsDto.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The product being added to the cart',
        type: () => product_entity_1.Product,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", product_entity_1.Product)
], CreateCartItemsDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The quantity of the product in the cart',
        example: 2,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCartItemsDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of the product at the time of adding to the cart',
        example: 19.99,
    }),
    (0, class_validator_1.IsDecimal)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateCartItemsDto.prototype, "price", void 0);
//# sourceMappingURL=create-cart-items.dto.js.map