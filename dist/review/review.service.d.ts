import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export declare class ReviewService {
    private reviewRepository;
    private productRepository;
    private userRepository;
    constructor(reviewRepository: Repository<Review>, productRepository: Repository<Product>, userRepository: Repository<User>);
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    findAll(): Promise<Review[]>;
}
