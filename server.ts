import express from 'express';
import cartRoutes from './src/routes/cartRoutes';

const app = express();
app.use(express.json());

app.use('/cart', cartRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
