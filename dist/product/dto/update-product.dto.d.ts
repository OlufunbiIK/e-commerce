import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    title?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
}
export {};
