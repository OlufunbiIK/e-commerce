import { Request, Response } from 'express';
import { CartItem } from '../cart-items/cart-items-entity/cart-items.entity';
import { AppDataSource } from '../config/datasource';
import { Product } from '../product/entities/product.entity';
import { Cart } from './entities/cart.entity';

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartRepo = AppDataSource.getRepository(Cart);
    const cartItemRepo = AppDataSource.getRepository(CartItem);
    const productRepo = AppDataSource.getRepository(Product);

    let cart = await cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items'],
    });

    if (!cart) {
      cart = cartRepo.create({ user: { id: userId }, items: [] });
      await cartRepo.save(cart);
    }

    const product = await productRepo.findOne({ where: { id: productId } });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const cartItem = cartItemRepo.create({ cart, product, quantity });
    await cartItemRepo.save(cartItem);

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
