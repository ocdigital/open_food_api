import { ProductRepository } from "../repositories/productRepository";
import { Product } from "../models/product";
import { Client } from "@elastic/elasticsearch";

export class ProductService {
    private productRepository = new ProductRepository();
    private esClient: Client;

    constructor(){
        this.esClient = new Client({ node: process.env.ELASTICSEARCH_URL });        
    }

    async createProduct(product: Product): Promise<Product> {
        const createProduct = await this.productRepository.create(product);

        await this.esClient.index({
            index: 'products',
            body: product
        });

        return createProduct;
    }

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

    async searchProducts(query: string, page: number, pageSize:number): Promise<Product[]> {
        const response = await this.esClient.search({
            index: 'products',
            from: (page - 1) * pageSize,
            body: {
                query: {
                    match_all:{}
                },
                from: (page - 1) * pageSize,
                size: pageSize
            }
        });
        const hits = response.hits.hits;
        return hits.map((hit: any) => hit._source);
    }

}