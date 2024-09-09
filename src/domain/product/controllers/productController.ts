import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    res.json(product);
}

export const getProducts = async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10 } = req.query;
    const products = await productService.getAllProducts(Number(page), Number(pageSize));
    res.json(products);  
}

export const getProductByCode = async (req: Request, res: Response) => {   
    const { code } = req.params;

    const product = await productService.getProductByCode(code);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
}

export const updateProduct = async (req: Request, res: Response) => {
    const { code } = req.params;
    const updates = req.body;
    const product = await productService.updateProduct(code, updates);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { code } = req.params;
    const product = await productService.deleteProduct(code);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);

}

export const searchProducts = async (req: Request, res: Response) => {   
    const { query, page = 1, pageSize = 10 } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }
    const products = await productService.searchProducts(query as string, Number(page), Number(pageSize));
    res.json(products);
}
