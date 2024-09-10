import request from 'supertest';
import express from 'express';
import { getProducts } from '../controllers/productController';
import { ProductService } from '../services/productService';

jest.mock('../services/productService');

const app = express();
app.use(express.json());
app.get('/products', getProducts);

describe('GET /products', () => {
  it('should return a list of products', async () => {
    const mockProducts = [
      {
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
      },
      {
        code: '456',
        status: 'published',
        imported_t: '2024-09-09T12:35:56Z',
        url: 'http://example.com/product/456',
        creator: 'user456',
        created_t: '2024-09-09T12:10:00Z',
        last_modified_t: '2024-09-09T12:40:00Z',
        product_name: 'Product 2',
        quantity: '1L',
        brands: 'Brand B',
        categories: 'Beverages',
        labels: 'Fair Trade',
        cities: 'City B',
        purchase_places: 'Store B',
        stores: 'Supermarket B',
        ingredients_text: 'Ingredients for product 2',
        traces: 'Gluten',
        serving_size: '250ml',
        serving_quantity: 250,
        nutriscore_score: 3,
        nutriscore_grade: 'A',
        main_category: 'Beverages',
        image_url: 'http://example.com/images/product2.jpg'
      }
    ];

    (ProductService.prototype.getAllProducts as jest.Mock).mockResolvedValue(mockProducts);

    const response = await request(app).get('/products').query({ page: 1, pageSize: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts); 
    expect(ProductService.prototype.getAllProducts).toHaveBeenCalledWith(1, 10); 
  });

  it('should return an empty list if no products are found', async () => {
    (ProductService.prototype.getAllProducts as jest.Mock).mockResolvedValue([]);

    const response = await request(app).get('/products').query({ page: 1, pageSize: 10 });

    expect(response.status).toBe(200); 
    expect(response.body).toEqual([]); 
    expect(ProductService.prototype.getAllProducts).toHaveBeenCalledWith(1, 10);
  });
});
