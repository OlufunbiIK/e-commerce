/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  // ManyToOne,
} from 'typeorm';
import { ProductCategory } from '../../category/enum/productCategory.enum';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal')
  price: number;

  // @Column({ type: 'enum', enum: ProductCategory })
  // category: ProductCategory;

  @Column()
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations
  // 1. category
  // 2. seller
  // 2. order
  // 4. orderItems
  // 5. reviews
  // 6. maybe cart ???
  
  @ManyToOne(
    () => Category,
    { eager: true },
  )
  @JoinColumn()
  category: ProductCategory;

  @ManyToOne(
    () => User,
    (user) => user.products,
    { onDelete: 'CASCADE' }
  )
  seller: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
