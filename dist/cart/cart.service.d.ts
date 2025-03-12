import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
import { Product } from 'src/product/entities/product.entity';
export declare class CartService {
    private readonly cartRepository;
    private readonly cartItemRepository;
    private readonly productRepository;
    constructor(cartRepository: Repository<Cart>, cartItemRepository: Repository<CartItem>, productRepository: Repository<Product>);
    getCart(userId: number): Promise<Cart>;
    addToCart(userId: number, productId: number, quantity: number): Promise<Cart>;
    getAllCartItems(): Promise<CartItem[]>;
    getCartItemsByUser(userId: number): Promise<CartItem[]>;
    removeFromCart(userId: number, productId: number): Promise<{
        message: string;
    }>;
}
