import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  reference: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;
}
