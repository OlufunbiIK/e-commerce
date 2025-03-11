import { UserRole } from '../enum/userRole.enum';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email?: string;
    password: string;
    role?: UserRole;
    isVerified?: boolean;
    googleId?: string;
    storeName?: string;
    storeDescription?: string;
    storeAddress?: string;
    phoneNumber?: string;
}
