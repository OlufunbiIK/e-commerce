/* eslint-disable @typescript-eslint/no-unused-vars */
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
    let cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.product'],
    });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = this.cartRepository.create({
        user: { id: userId },
        quantity: 0, // Initially, there are no items in the cart
        totalPrice: 0, // Total price starts at 0
      });

      await this.cartRepository.save(cart); // Save the new cart
    }

    return cart;
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

  // Method to get all cart items
  async getAllCartItems(): Promise<CartItem[]> {
    try {
      return await this.cartItemRepository.find(); // This fetches all cart items
    } catch (error) {
      throw new Error('Error retrieving cart items');
    }
  }

  async getCartItemsByUser(userId: number): Promise<CartItem[]> {
    try {
      return await this.cartItemRepository.find({
        where: { cart: { user: { id: userId } } },
      });
    } catch (error) {
      throw new Error('Error retrieving cart items');
    }
  }
}
