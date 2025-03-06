import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(): Promise<any>;
    findOneById(id: string): Promise<any>;
    findOneByName(categoryName: string): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
