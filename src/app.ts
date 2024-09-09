import express from 'express';
import productRoutes from './domain/product/routes/productRoutes';
import { getApiStatus } from './domain/status/controllers/statusController';
import './shared/services/cronService';
import { jwtMiddleware } from './shared/middlewares/jwtMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/api', getApiStatus);
app.use('/api/products', jwtMiddleware, productRoutes);


export default app;
