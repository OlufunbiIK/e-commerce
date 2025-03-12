import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { Product } from './entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    getAllProducts(postQuery: GetProductsDto): Promise<paginated<Product>>;
    findOne(id: string): Promise<{
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
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
    findByProductUrl(encodedUrl: string): Promise<{
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
    remove(id: string): Promise<{
        message: string;
    }>;
}
