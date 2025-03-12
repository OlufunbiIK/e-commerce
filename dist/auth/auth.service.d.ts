import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: CreateUserDto): Promise<{
        message: string;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../user/enum/userRole.enum").UserRole;
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
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
