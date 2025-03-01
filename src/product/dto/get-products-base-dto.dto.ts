import { IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/interceptors/pagination/pagination-query-dto.dto';

class GetProductsBaseDto {
  @ApiProperty({
    description: 'Start date for filtering products',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: 'End date for filtering products',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetProductsDto extends IntersectionType(
  GetProductsBaseDto,
  PaginationQueryDto,
) {}
