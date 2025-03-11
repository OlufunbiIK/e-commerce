import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { paginated } from '../interfaces/pagination.interfaces';
import { PaginationQueryDto } from 'src/common/interceptors/data-response/pagination/pagination-query.dto';
export declare class PaginationProvider {
    private readonly request;
    constructor(request: Request);
    paginationQuery<T extends ObjectLiteral>(paginatedQueryDto: PaginationQueryDto, repository: Repository<T>): Promise<paginated<T>>;
}
