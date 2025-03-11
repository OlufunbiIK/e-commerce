import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './enum/userRole.enum';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
export declare class UserController {
    private readonly userService;
    private readonly findOneByEmailProvider;
    constructor(userService: UserService, findOneByEmailProvider: FindOneByEmailProvider);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAllAdmins(): Promise<{
        admins: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: UserRole;
            isVerified: boolean;
            phoneNumber?: string;
            createdAt: Date;
            updatedAt: Date;
            products: import("../product/entities/product.entity").Product[];
            carts: import("../cart/entities/cart.entity").Cart[];
            orders: import("../order/entities/order.entity").Order[];
            reviews: import("../review/entities/review.entity").Review[];
        }[];
    }>;
    findAllSellers(): Promise<{
        sellers: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: UserRole;
            isVerified: boolean;
            storeName?: string;
            storeDescription?: string;
            storeAddress?: string;
            phoneNumber?: string;
            createdAt: Date;
            updatedAt: Date;
            products: import("../product/entities/product.entity").Product[];
            carts: import("../cart/entities/cart.entity").Cart[];
            orders: import("../order/entities/order.entity").Order[];
            reviews: import("../review/entities/review.entity").Review[];
        }[];
    }>;
    findAdminByEmail(email: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: UserRole;
        isVerified: boolean;
        phoneNumber?: string;
        createdAt: Date;
        updatedAt: Date;
        products: import("../product/entities/product.entity").Product[];
        carts: import("../cart/entities/cart.entity").Cart[];
        orders: import("../order/entities/order.entity").Order[];
        reviews: import("../review/entities/review.entity").Review[];
    }>;
    findSellerByEmail(email: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: UserRole;
        isVerified: boolean;
        storeName?: string;
        storeDescription?: string;
        storeAddress?: string;
        phoneNumber?: string;
        createdAt: Date;
        updatedAt: Date;
        products: import("../product/entities/product.entity").Product[];
        carts: import("../cart/entities/cart.entity").Cart[];
        orders: import("../order/entities/order.entity").Order[];
        reviews: import("../review/entities/review.entity").Review[];
    }>;
    findOneByEmail(email: string): Promise<import("./entities/user.entity").User>;
    update(email: string, updateUserDto: UpdateUserDto): string;
    remove(email: string): string;
}
