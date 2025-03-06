import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ProductCategory } from './enum/productCategory.enum';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOneById(id: string): Promise<{
        products: {
            id: number;
            title: string;
            description: string;
            price: number;
            stock: number;
            productUrl?: string;
            createdAt: Date;
            updatedAt: Date;
            category: number;
            orderItems: import("../order-item/entities/order-item.entity").OrderItem[];
            reviews: import("../review/entities/review.entity").Review[];
            cartItems: import("../cart-items/entities/cart-items.entity").CartItem[];
        }[];
        id: number;
        name: ProductCategory;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOneByName(categoryName: string): Promise<{
        products: {
            id: number;
            title: string;
            description: string;
            price: number;
            stock: number;
            productUrl?: string;
            createdAt: Date;
            updatedAt: Date;
            category: number;
            orderItems: import("../order-item/entities/order-item.entity").OrderItem[];
            reviews: import("../review/entities/review.entity").Review[];
            cartItems: import("../cart-items/entities/cart-items.entity").CartItem[];
        }[];
        id: number;
        name: ProductCategory;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
