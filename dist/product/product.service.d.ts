import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.service';
import { paginated } from 'src/common/pagination/interfaces/pagination.interfaces';
import { GetProductsDto } from './dto/get-products.dto';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Cache } from 'cache-manager';
export declare class ProductService {
    private readonly productRepository;
    private readonly paginationService;
    private readonly categoryService;
    private readonly userService;
    private cacheManager;
    constructor(productRepository: Repository<Product>, paginationService: PaginationProvider, categoryService: CategoryService, userService: UserService, cacheManager: Cache);
    create(createProductDto: CreateProductDto): Promise<any>;
    getAllProducts(productQuery: GetProductsDto): Promise<paginated<Product>>;
    findOne(id: number): Promise<any>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
