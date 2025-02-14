/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Product } from '../../product/entities/product.entity';
// import { Order } from '../../order/entities/order.entity';
import { UserRole } from '../enum/userRole.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  googleId?: string;

  // @OneToMany(() => Product, (product) => product.seller)
  // products: Product[];

  // @OneToMany(() => Order, (order) => order.user)
  // orders: Order[];
}
