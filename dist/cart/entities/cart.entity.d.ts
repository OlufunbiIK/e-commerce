import { User } from '../../user/entities/user.entity';
import { CartStatus } from '../enum/cartStatus.enum';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
export declare class Cart {
    id: number;
    user: User;
    quantity: number;
    status: CartStatus;
    cartItems: CartItem[];
    totalPrice: number;
}
