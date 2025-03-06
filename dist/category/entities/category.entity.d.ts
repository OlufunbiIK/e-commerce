import { ProductCategory } from '../enum/productCategory.enum';
import { Product } from 'src/product/entities/product.entity';
export declare class Category {
    id: number;
    name: ProductCategory;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
}
