import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.entity").Category>;
    findAll(): Promise<import("./entities/category.entity").Category[]>;
    findOne(id: string): Promise<{
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
        name: import("./enum/productCategory.enum").ProductCategory;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
