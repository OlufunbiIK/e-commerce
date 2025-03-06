import { PaginationQueryDto } from 'src/common/interceptors/pagination/pagination-query-dto.dto';
declare class GetUsersBaseDto {
    startDate?: Date;
    endDate?: Date;
}
declare const GetUsersDto_base: import("@nestjs/common").Type<PaginationQueryDto & GetUsersBaseDto>;
export declare class GetUsersDto extends GetUsersDto_base {
}
export {};
