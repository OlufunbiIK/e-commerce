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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const swagger_1 = require("@nestjs/swagger");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart(body) {
        try {
            return await this.cartService.addToCart(body.userId, body.productId, body.quantity);
        }
        catch (error) {
            throw error;
        }
    }
    async getCart(userId) {
        try {
            return await this.cartService.getCart(userId);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllCartItems() {
        return this.cartService.getAllCartItems();
    }
    async getCartItemsByUser(userId) {
        return this.cartService.getCartItemsByUser(userId);
    }
    removeFromCart(body) {
        return this.cartService.removeFromCart(body.userId, body.productId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('add'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add an item to the cart',
        description: 'Adds a product to the user’s cart with the specified quantity.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                userId: {
                    type: 'number',
                    example: 1,
                    description: 'ID of the user adding the product to the cart',
                },
                productId: {
                    type: 'number',
                    example: 101,
                    description: 'ID of the product to be added',
                },
                quantity: {
                    type: 'number',
                    example: 2,
                    description: 'Quantity of the product to be added',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Item successfully added to cart',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid input data',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the user’s cart',
        description: 'Retrieves the user’s cart based on the user ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'number',
        example: 1,
        description: 'ID of the user whose cart is being fetched',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cart retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Cart not found',
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Get)('cart-items'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all cart items',
        description: 'Retrieves all cart items from the database.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all cart items retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getAllCartItems", null);
__decorate([
    (0, common_1.Get)('items/:userId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get cart items for a user',
        description: 'Retrieves all cart items for a specific user by user ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userId',
        type: 'number',
        example: 1,
        description: 'ID of the user whose cart items are being fetched',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cart items retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCartItemsByUser", null);
__decorate([
    (0, common_1.Delete)('remove'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove an item from the cart',
        description: 'Removes a specific product from the user’s cart.',
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                userId: {
                    type: 'number',
                    example: 1,
                    description: 'ID of the user',
                },
                productId: {
                    type: 'number',
                    example: 101,
                    description: 'ID of the product to remove',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Item removed from cart successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Item not found in cart',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, common_1.Controller)('carts'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map