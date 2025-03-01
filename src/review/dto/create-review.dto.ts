import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty() // Ensures rating is not null
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
