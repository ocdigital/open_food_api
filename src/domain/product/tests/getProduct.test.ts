import request from 'supertest';
import express from 'express';
import { getProductByCode } from '../controllers/productController';
import { ProductService } from '../services/productService';
jest.mock('../services/productService');

const app = express();
app.use(express.json());
app.get('/products/:code', getProductByCode);

describe('GET /products/:code', () => {
  it('should return the product details when the product is found', async () => {
    const mockProduct = {
      code: '123',
      status: 'published',
      imported_t: '2024-09-09T12:34:56Z',
      url: 'http://example.com/product/123',
      creator: 'user123',
      created_t: '2024-09-09T12:00:00Z',
      last_modified_t: '2024-09-09T12:30:00Z',
      product_name: 'Product 1',
      quantity: '500g',
      brands: 'Brand A',
      categories: 'Snacks',
      labels: 'Organic',
      cities: 'City A',
      purchase_places: 'Store A',
      stores: 'Supermarket A',
      ingredients_text: 'Ingredients for product 1',
      traces: 'Nuts',
      serving_size: '100g',
      serving_quantity: 100,
      nutriscore_score: 5,
      nutriscore_grade: 'B',
      main_category: 'Snacks',
      image_url: 'http://example.com/images/product1.jpg'
    };

    (ProductService.prototype.getProductByCode as jest.Mock).mockResolvedValue(mockProduct);

    const response = await request(app).get('/products/123');


    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct); 
    expect(ProductService.prototype.getProductByCode).toHaveBeenCalledWith('123');
  });

  it('should return 404 if the product is not found', async () => {
    (ProductService.prototype.getProductByCode as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get('/products/999');

    expect(response.status).toBe(404); 
    expect(response.body).toEqual({ message: 'Product not found' });
    expect(ProductService.prototype.getProductByCode).toHaveBeenCalledWith('999');
  });
  
});
