import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class InitializePaymentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
