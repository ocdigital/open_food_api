import { ProductRepository } from "../repositories/productRepository";
import { Product } from "../models/product";

export class ProductService {
    private productRepository = new ProductRepository();

    async getAllProducts(page: number, pageSize: number): Promise<Product[]> {
        return this.productRepository.getAll(page, pageSize);
    }

    async getProductByCode(code: string): Promise<Product | null> {
        return this.productRepository.getByCode(code);
    }

    async updateProduct(code: string, updates: Partial<Product>): Promise<Product | null> {
        return this.productRepository.updateByCode(code, updates);
    }

    async deleteProduct(code: string): Promise<Product | null> {
        return this.productRepository.deleteByCode(code);
    }

}