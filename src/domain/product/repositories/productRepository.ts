import { ProductModel, Product } from "../entities/product";

export class ProductRepository {

    async create(product: Product): Promise<Product> {
        try {
            const createdProduct = await ProductModel.create(product);
            return createdProduct;
        } catch (error) {
            throw error;
        }
    }

    async getAll(page: number, pageSize: number): Promise<Product[]> {
        return ProductModel.find({ status: { $ne: 'trash' } }).skip((page - 1) * pageSize).limit(pageSize);
    }

    async getByCode(code: string): Promise<Product | null> {
        return ProductModel.findOne({ code, status: { $ne: 'trash' } });
    }

    async updateByCode(code: string, updates: Partial<Product>): Promise<Product | null> {
        return ProductModel.findOneAndUpdate({ code, status: { $ne: 'trash' } }, updates, { new: true });
    }

    async deleteByCode(code: string): Promise<Product | null> {
        return ProductModel.findOneAndUpdate({ code }, { status: 'trash' }, { new: true });
    }
}