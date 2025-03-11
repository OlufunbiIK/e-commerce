import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Review {
    id: number;
    comment: string;
    rating: number;
    user: User;
    product: Product;
    createdAt: Date;
}
