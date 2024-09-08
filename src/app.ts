import express from 'express';
import productRoutes from './routes/productRoutes';
import { getApiStatus } from './controllers/statusController';
import './services/cronService';
import './config/instrument';
import Sentry from '@sentry/node';

const app = express();
app.use(express.json());

app.get('/', getApiStatus);
app.use('/products', productRoutes);

Sentry.setupExpressErrorHandler(app);

export default app;
