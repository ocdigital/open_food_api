import { ProductModel, Product } from "../models/product";

export class ProductRepository {

    async create(product: Product): Promise<Product> {
        try {
            const createdProduct = await ProductModel.create(product);
            console.log('Produto criado com sucesso:', createdProduct);
            return createdProduct;
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    }

    async getAll(page: number, pageSize: number): Promise<Product[]> {
        return ProductModel.find().skip((page - 1) * pageSize).limit(pageSize);
    }

    async getByCode(code: string): Promise<Product | null> {
        return ProductModel.findOne({ code })
    }

    async updateByCode(code: string, updates: Partial<Product>): Promise<Product | null> {
        return ProductModel.findOneAndUpdate({ code }, updates, { new: true });
    }

    async deleteByCode(code: string): Promise<Product | null> {
        return ProductModel.findOneAndUpdate({ code }, { status: 'trash' }, { new: true });
    }
}