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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../product/entities/product.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const userRole_enum_1 = require("../enum/userRole.enum");
const review_entity_1 = require("../../review/entities/review.entity");
const cart_entity_1 = require("../../cart/entities/cart.entity");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Unique identifier for the user' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    (0, swagger_1.ApiProperty)({ example: 'John', description: 'User first name' }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    (0, swagger_1.ApiProperty)({ example: 'Doe', description: 'User last name' }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, unique: true }),
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@example.com',
        description: 'User email address',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'hashedpassword123',
        description: 'User password (hashed)',
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: userRole_enum_1.UserRole, default: userRole_enum_1.UserRole.CUSTOMER }),
    (0, swagger_1.ApiProperty)({
        example: 'CUSTOMER',
        enum: userRole_enum_1.UserRole,
        description: 'User role (Admin, Customer, Seller)',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, nullable: false }),
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indicates if the user is verified',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: '1234567890',
        description: 'Google ID if signed in with Google',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: "John's Store",
        description: 'Store name (if user is a seller)',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "storeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: 'We sell quality electronics.',
        description: 'Store description',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "storeDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: '1234 Main Street, NY',
        description: 'Store address',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "storeAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, swagger_1.ApiProperty)({
        example: '+1 234 567 890',
        description: 'User phone number',
        required: false,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        example: '2024-02-20T12:00:00Z',
        description: 'Timestamp when the user was created',
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    (0, swagger_1.ApiProperty)({
        example: '2024-02-21T12:00:00Z',
        description: 'Timestamp when the user was last updated',
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.seller),
    (0, swagger_1.ApiProperty)({
        type: () => [product_entity_1.Product],
        description: 'List of products owned by the user',
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cart) => cart.user),
    (0, swagger_1.ApiProperty)({
        type: () => [cart_entity_1.Cart],
        description: 'List of carts associated with the user',
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "carts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (order) => order.user),
    (0, swagger_1.ApiProperty)({
        type: () => [order_entity_1.Order],
        description: 'List of orders made by the user',
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.user),
    (0, swagger_1.ApiProperty)({
        type: () => [review_entity_1.Review],
        description: 'List of reviews made by the user',
        required: false,
    }),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map