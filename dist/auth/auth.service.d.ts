import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserRole } from '../user/enum/userRole.enum';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: CreateUserDto): Promise<{
        message: string;
        user: User;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
    googleLogin(profile: any): Promise<{
        access_token: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    }>;
}
