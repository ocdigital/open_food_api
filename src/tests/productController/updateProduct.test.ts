import request from 'supertest';
import express from 'express';
import { updateProduct } from '../../controllers/productController';
import { ProductService } from '../../services/productService';
jest.mock('../../services/productService');

const app = express();
app.use(express.json());
app.put('/products/:code', updateProduct);

describe('PUT /products/:code', () => {
  it('should update the product and return the updated product details', async () => {
    const mockUpdatedProduct = {
      code: '123',
      status: 'published',
      imported_t: '2024-09-09T12:34:56Z',
      url: 'http://example.com/product/123',
      creator: 'user123',
      created_t: '2024-09-09T12:00:00Z',
      last_modified_t: '2024-09-09T12:30:00Z',
      product_name: 'Updated Product 1',
      quantity: '600g',
      brands: 'Brand A',
      categories: 'Snacks',
      labels: 'Organic',
      cities: 'City A',
      purchase_places: 'Store A',
      stores: 'Supermarket A',
      ingredients_text: 'Updated ingredients for product 1',
      traces: 'Nuts',
      serving_size: '100g',
      serving_quantity: 100,
      nutriscore_score: 5,
      nutriscore_grade: 'B',
      main_category: 'Snacks',
      image_url: 'http://example.com/images/product1.jpg'
    };

    const updateData = {
      product_name: 'Updated Product 1',
      quantity: '600g',
      ingredients_text: 'Updated ingredients for product 1'
    };

    (ProductService.prototype.updateProduct as jest.Mock).mockResolvedValue(mockUpdatedProduct);

    const response = await request(app)
      .put('/products/123')
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUpdatedProduct); 
    expect(ProductService.prototype.updateProduct).toHaveBeenCalledWith('123', updateData);
  });

  it('should return 404 if the product to update is not found', async () => {
    (ProductService.prototype.updateProduct as jest.Mock).mockResolvedValue(null);

    const updateData = {
      product_name: 'Non-existent Product',
      quantity: '0g'
    };

    const response = await request(app)
      .put('/products/999')
      .send(updateData);

    expect(response.status).toBe(404); 
    expect(response.body).toEqual({ message: 'Product not found' });
    expect(ProductService.prototype.updateProduct).toHaveBeenCalledWith('999', updateData);
  });
});
