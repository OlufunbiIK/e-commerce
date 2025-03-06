import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { FindOneByEmailProvider } from './providers/findOneByEmail.provider';
export declare class UserService {
    private readonly userRepository;
    private readonly paginationService;
    private readonly findOneByEmailProvider;
    constructor(userRepository: Repository<User>, paginationService: PaginationProvider, findOneByEmailProvider: FindOneByEmailProvider);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAllAdmins(): Promise<{
        admins: any;
    }>;
    findAdminByEmail(email: string): Promise<any>;
    findAllSellers(): Promise<{
        sellers: any;
    }>;
    findSellerByEmail(email: string): Promise<any>;
    findOneById(id: string): Promise<any>;
    update(email: string, updateUserDto: UpdateUserDto): string;
    remove(email: string): string;
}
