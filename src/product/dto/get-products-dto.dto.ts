import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/interceptors/pagination/pagination-query-dto.dto';

class GetProductsBaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetProductsDto extends IntersectionType(
  GetProductsBaseDto,
  PaginationQueryDto,
) {}
