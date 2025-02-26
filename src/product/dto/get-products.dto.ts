import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/interceptors/data-response/pagination/pagination-query.dto';
import { Type } from 'class-transformer';

class GetProductsBaseDto {
  @IsOptional()
  @Type(() => Date) // Ensures string is converted to Date
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date) // Ensures string is converted to Date
  @IsDate()
  endDate?: Date;
}

export class GetProductsDto extends IntersectionType(
  GetProductsBaseDto,
  PaginationQueryDto,
) {}
