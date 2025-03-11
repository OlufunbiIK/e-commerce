import { CartStatus } from '../enum/cartStatus.enum';
import { User } from 'src/user/entities/user.entity';
export declare class CreateCartDto {
    id: number;
    productId: number;
    user: User;
    quantity: number;
    status?: CartStatus;
}
