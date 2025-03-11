import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(createReviewDto: CreateReviewDto): Promise<{
        message: string;
        review: import("./entities/review.entity").Review;
    }>;
    findAll(): Promise<import("./entities/review.entity").Review[]>;
}
