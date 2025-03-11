import { ObjectLiteral, Repository } from 'typeorm';
import { paginated } from '../interfaces/pagination-interface';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/interceptors/pagination/pagination-query-dto.dto';
export declare class PaginationProvider {
    private readonly request;
    constructor(request: Request);
    paginationQuery<T extends ObjectLiteral>(paginatedQueryDto: PaginationQueryDto, repository: Repository<T>): Promise<paginated<T>>;
}
