import request from 'supertest';
import express from 'express';
import { getProducts } from '../controllers/productController';
import { ProductService } from '../services/productService';

jest.mock('../services/productService');

const app = express();
app.use(express.json());
app.get('/', getProducts);

describe('GET /', () => {
  it('should return a list of products', async () => {
    const mockProducts = [
      { code: '123', name: 'Product 1', price: 10 },
      { code: '456', name: 'Product 2', price: 20 },
    ];

    (ProductService.prototype.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

    const response = await request(app).get('/').query({ page: 1, pageSize: 10 });

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
    expect(ProductService.prototype.getAllProducts).toHaveBeenCalledWith(1, 10);
  });

});