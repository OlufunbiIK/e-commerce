import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
