import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { ALL_CATEGORIES, ProductCategory } from '../enum/productCategory.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column({type:"enum", enum:ProductCategory, default:ALL_CATEGORIES})
  category: ProductCategory

  @Column()
  stock: number;

   @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => User, (user) => user.products)
  seller: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}
