import { Product } from '../../product/entities/product.entity';
import { Order } from '../../order/entities/order.entity';
import { UserRole } from '../enum/userRole.enum';
import { Review } from 'src/review/entities/review.entity';
import { Cart } from 'src/cart/entities/cart.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isVerified: boolean;
    googleId?: string;
    storeName?: string;
    storeDescription?: string;
    storeAddress?: string;
    phoneNumber?: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
    carts: Cart[];
    orders: Order[];
    reviews: Review[];
}
