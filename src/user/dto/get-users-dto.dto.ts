import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/interceptors/pagination/pagination-query-dto.dto';

class GetUsersBaseDto {
  @ApiProperty({
    example: '2024-01-01',
    description: 'Filter users from this start date',
    required: false,
  })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Filter users until this end date',
    required: false,
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetUsersDto extends IntersectionType(
  GetUsersBaseDto,
  PaginationQueryDto,
) {}
