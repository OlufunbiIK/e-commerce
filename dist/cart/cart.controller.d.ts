import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(body: AddToCartDto): Promise<import("./entities/cart.entity").Cart>;
    getCart(userId: number): Promise<import("./entities/cart.entity").Cart>;
    getAllCartItems(): Promise<CartItem[]>;
    getCartItemsByUser(userId: number): Promise<CartItem[]>;
    removeFromCart(body: {
        userId: number;
        productId: number;
    }): Promise<{
        message: string;
    }>;
}
