import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: CreateUserDto): Promise<{
        message: string;
        user: import("../user/entities/user.entity").User;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}
