import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(body: any): Promise<import("./entities/cart.entity").Cart>;
    getCart(userId: number): Promise<import("./entities/cart.entity").Cart>;
    removeFromCart(body: any): Promise<{
        message: string;
    }>;
}
