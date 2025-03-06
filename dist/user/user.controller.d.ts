import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
export declare class UserController {
    private readonly userService;
    private readonly findOneByEmailProvider;
    constructor(userService: UserService, findOneByEmailProvider: FindOneByEmailProvider);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAllAdmins(): Promise<{
        admins: any;
    }>;
    findAllSellers(): Promise<{
        sellers: any;
    }>;
    findAdminByEmail(email: string): Promise<any>;
    findSellerByEmail(email: string): Promise<any>;
    findOneByEmail(email: string): Promise<import("./entities/user.entity").User>;
    update(email: string, updateUserDto: UpdateUserDto): string;
    remove(email: string): string;
}
