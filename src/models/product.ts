import { Schema, model } from 'mongoose';

export interface Product {
    code: string;
    name: string;
    status: string;
}

const productSchema = new Schema<Product>({
    code: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true }
});

export const ProductModel = model<Product>('Product', productSchema);