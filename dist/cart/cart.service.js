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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const cart_items_entity_1 = require("../cart-items/entities/cart-items.entity");
const product_entity_1 = require("../product/entities/product.entity");
let CartService = class CartService {
    constructor(cartRepository, cartItemRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }
    async getCart(userId) {
        let cart = await this.cartRepository.findOne({
            where: { user: { id: userId } },
            relations: ['cartItems', 'cartItems.product'],
        });
        if (!cart) {
            cart = this.cartRepository.create({
                user: { id: userId },
                quantity: 0,
                totalPrice: 0,
            });
            await this.cartRepository.save(cart);
        }
        return cart;
    }
    async addToCart(userId, productId, quantity) {
        const cart = await this.getCart(userId);
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const cartItem = this.cartItemRepository.create({
            cart,
            product,
            quantity,
            price: product.price * quantity,
        });
        await this.cartItemRepository.save(cartItem);
        return cart;
    }
    async getAllCartItems() {
        try {
            return await this.cartItemRepository.find();
        }
        catch (error) {
            throw new Error('Error retrieving cart items');
        }
    }
    async getCartItemsByUser(userId) {
        try {
            return await this.cartItemRepository.find({
                where: { cart: { user: { id: userId } } },
            });
        }
        catch (error) {
            throw new Error('Error retrieving cart items');
        }
    }
    async removeFromCart(userId, productId) {
        const cart = await this.getCart(userId);
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const cartItem = await this.cartItemRepository.findOne({
            where: { cart: { id: cart.id }, product: { id: productId } },
        });
        if (!cartItem)
            throw new common_1.NotFoundException('Item not found in cart');
        await this.cartItemRepository.remove(cartItem);
        return { message: 'Item removed from cart successfully' };
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_items_entity_1.CartItem)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
//# sourceMappingURL=cart.service.js.map