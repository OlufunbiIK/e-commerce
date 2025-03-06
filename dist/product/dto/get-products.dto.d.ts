import { PaginationQueryDto } from 'src/common/interceptors/data-response/pagination/pagination-query.dto';
declare class GetProductsBaseDto {
    startDate?: Date;
    endDate?: Date;
}
declare const GetProductsDto_base: import("@nestjs/common").Type<PaginationQueryDto & GetProductsBaseDto>;
export declare class GetProductsDto extends GetProductsDto_base {
}
export {};
