import express from 'express';
import productRoutes from './routes/productRoutes';
import { getApiStatus } from './controllers/statusController';

const app = express();
app.use(express.json());

app.get('/', getApiStatus);
app.use('/products', productRoutes);

export default app;
