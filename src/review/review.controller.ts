import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserRole } from 'src/user/enum/userRole.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Reviews') // Groups endpoints under "Reviews" in Swagger UI
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review added successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBearerAuth() // Adds Authorization field in Swagger for JWT token
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

  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Reviews retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
