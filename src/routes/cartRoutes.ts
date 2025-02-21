import express from 'express';
import { addToCart } from '../cart/cart.controller';

const router = express.Router();

// ✅ Ensure the function is passed correctly
router.post('/add', (req, res) => addToCart(req, res));

export default router;
