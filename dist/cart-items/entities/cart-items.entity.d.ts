import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
export declare class CartItem {
    id: number;
    cart: Cart;
    product: Product;
    quantity: number;
    price: number;
}
