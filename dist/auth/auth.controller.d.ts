import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
}
