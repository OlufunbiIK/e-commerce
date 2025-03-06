import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The comment left by the user about the product',
    example: 'This product is amazing!',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Rating of the product between 1 and 5',
    example: 5,
    minimum: 1,
    maximum: 5,
  })
  @IsNotEmpty() // Ensures rating is not null
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'The ID of the product being reviewed',
    example: 101,
  })
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty({
    description: 'The ID of the user posting the review',
    example: 202,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
