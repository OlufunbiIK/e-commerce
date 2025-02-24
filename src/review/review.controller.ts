import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/enum/userRole.enum';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Roles(UserRole.CUSTOMER)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }
}
