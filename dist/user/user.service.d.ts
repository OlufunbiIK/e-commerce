import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
import { UserRole } from './enum/userRole.enum';
export declare class UserService {
    private readonly userRepository;
    private readonly paginationService;
    private readonly findOneByEmailProvider;
    constructor(userRepository: Repository<User>, paginationService: PaginationProvider, findOneByEmailProvider: FindOneByEmailProvider);
    create(createUserDto: CreateUserDto): Promise<User>;
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
    findOneById(id: string): Promise<User>;
    update(email: string, updateUserDto: UpdateUserDto): string;
    remove(email: string): string;
}
