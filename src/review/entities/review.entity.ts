import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  Check,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
@Check(`rating >= 1 AND rating <= 5`) // Ensures rating is between 1-5
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @Column({ type: 'int', default: 1, nullable: false })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'SET NULL', // Keeps review data even if user is deleted
    nullable: true,
  })
  @Index() // Improves query performance
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE', // If product is deleted, remove reviews
  })
  @Index()
  product: Product;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
