import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';

export class CreateCartItemsDto {
  @IsNotEmpty()
  @IsString()
  cart: Cart;

  @IsNotEmpty()
  @IsString()
  product: Product;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsDecimal()
  @IsNotEmpty()
  price: number;
}
