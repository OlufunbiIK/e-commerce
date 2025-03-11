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
exports.Review = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../product/entities/product.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Review = class Review {
};
exports.Review = Review;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique identifier for the review', example: 1 }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Review comment', example: 'Great product!' }),
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Review.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating given by the user (1-5)',
        example: 5,
        minimum: 1,
        maximum: 5,
    }),
    (0, typeorm_1.Column)({ type: 'int', default: 1, nullable: false }),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User who wrote the review',
        type: () => user_entity_1.User,
        nullable: true,
    }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reviews, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", user_entity_1.User)
], Review.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product that was reviewed',
        type: () => product_entity_1.Product,
    }),
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.reviews, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", product_entity_1.Product)
], Review.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the review was created',
        example: '2024-03-06T12:34:56.789Z',
    }),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Review.prototype, "createdAt", void 0);
exports.Review = Review = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Check)(`rating >= 1 AND rating <= 5`)
], Review);
//# sourceMappingURL=review.entity.js.map