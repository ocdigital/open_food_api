import express from 'express';
import productRoutes from './routes/productRoutes';
import { getApiStatus } from './controllers/statusController';
import './services/cronService';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

const app = express();
app.use(express.json());


app.get('/api', getApiStatus);
app.use('/api/products', jwtMiddleware, productRoutes);


export default app;
