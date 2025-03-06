import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
export declare class FindOneByEmailProvider {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findOneByEmail(email: string): Promise<User>;
}
