import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-items.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCart(userId: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });
  }

  async addToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.getCart(userId);
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');

    const cartItem = this.cartItemRepository.create({
      cart,
      product,
      quantity,
      price: product.price * quantity,
    });

    await this.cartItemRepository.save(cartItem);
    return cart;
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.getCart(userId);
    if (!cart) throw new NotFoundException('Cart not found');
  
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart: { id: cart.id }, product: { id: productId } },
    });
  
    if (!cartItem) throw new NotFoundException('Item not found in cart');
  
    await this.cartItemRepository.remove(cartItem);
    return { message: 'Item removed from cart successfully' };
  }
}
