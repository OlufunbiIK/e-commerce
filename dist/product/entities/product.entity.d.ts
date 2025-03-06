import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Review } from 'src/review/entities/review.entity';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
export declare class Product {
    id: number;
    title: string;
    description: string;
    price: number;
    stock: number;
    productUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    category: number;
    seller: number;
    orderItems: OrderItem[];
    reviews: Review[];
    cartItems: CartItem[];
}
