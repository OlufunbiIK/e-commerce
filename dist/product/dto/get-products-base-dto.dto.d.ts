import { PaginationQueryDto } from 'src/common/interceptors/pagination/pagination-query-dto.dto';
declare class GetProductsBaseDto {
    startDate?: Date;
    endDate?: Date;
}
declare const GetProductsDto_base: import("@nestjs/common").Type<PaginationQueryDto & GetProductsBaseDto>;
export declare class GetProductsDto extends GetProductsDto_base {
}
export {};
