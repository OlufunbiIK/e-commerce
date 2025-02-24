import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.productRepository.findOne({
      where: { id: createReviewDto.productId },
    });

    if (!product) throw new NotFoundException('Product not found');

    const user = await this.userRepository.findOne({
      where: { id: createReviewDto.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user,
      product,
    });
    return this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['user', 'product'] });
  }
}
