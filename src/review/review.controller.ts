import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Roles(UserRole.CUSTOMER)
  @UseGuards(JwtAuthGuard) // Ensures only authenticated users can post reviews
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      const review = await this.reviewService.create(createReviewDto);
      return { message: 'Review added successfully!', review };
    } catch (error) {
      throw new Error('Error creating review: ' + error.message);
    }
  }

  @Public()
  @Get()
  async findAll() {
    try {
      return await this.reviewService.findAll();
    } catch (error) {
      throw new Error('Error fetching reviews: ' + error.message);
    }
  }
}
