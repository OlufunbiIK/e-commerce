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
exports.Product = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const order_item_entity_1 = require("../../order-item/entities/order-item.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const review_entity_1 = require("../../review/entities/review.entity");
const cart_items_entity_1 = require("../../cart-items/entities/cart-items.entity");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the product' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the product',
        example: 'Smartphone XYZ',
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        default: 'Untitled Product',
        length: 150,
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detailed description of the product',
        example: 'This is a high-end smartphone.',
    }),
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the product', example: 499.99 }),
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items available in stock',
        example: 100,
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the product',
        example: 'https://example.com/product-xyz',
        required: false,
    }),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "productUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp when the product was created' }),
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Timestamp when the product was last updated' }),
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category of the product' }),
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Seller of the product' }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.products, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Number)
], Product.prototype, "seller", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Order items associated with this product',
        type: [order_item_entity_1.OrderItem],
    }),
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (orderItem) => orderItem.product),
    __metadata("design:type", Array)
], Product.prototype, "orderItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Reviews of the product', type: [review_entity_1.Review] }),
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cart items associated with the product',
        type: [cart_items_entity_1.CartItem],
    }),
    (0, typeorm_1.OneToMany)(() => cart_items_entity_1.CartItem, (cartItem) => cartItem.product, { eager: true }),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
//# sourceMappingURL=product.entity.js.map