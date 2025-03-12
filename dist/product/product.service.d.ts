import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.service';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { GetProductsDto } from './dto/get-products.dto';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';
export declare class ProductService {
    private readonly productRepository;
    private readonly paginationService;
    private readonly categoryService;
    private readonly userService;
    private cacheManager;
    constructor(productRepository: Repository<Product>, paginationService: PaginationProvider, categoryService: CategoryService, userService: UserService, cacheManager: Cache);
    create(createProductDto: CreateProductDto): Promise<Product>;
    getAllProducts(productQuery: GetProductsDto): Promise<paginated<Product>>;
    findOne(id: number): Promise<{
        seller: any;
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
    }>;
    getProductByProductUrl(productUrl: string): Promise<{
        seller: any;
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
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        title: string;
        description: string;
        price: number;
        stock: number;
        productUrl?: string;
        createdAt: Date;
        updatedAt: Date;
        category: never;
        orderItems: import("../order-item/entities/order-item.entity").OrderItem[];
        reviews: import("../review/entities/review.entity").Review[];
        cartItems: import("../cart-items/entities/cart-items.entity").CartItem[];
        sellerId?: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
