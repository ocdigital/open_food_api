import { Schema, model } from 'mongoose';

export interface Product {
    code: string;
    status: string;
    imported_t: string;
    url: string;
    creator: string;
    created_t: number;
    last_modified_t: number;
    product_name: string;
    quantity: string;
    brands: string;
    categories: string;
    labels: string;
    cities: string;
    purchase_places: string;
    stores: string;
    ingredients_text: string;
    traces: string;
    serving_size: string;
    serving_quantity: number;
    nutriscore_score: number;
    nutriscore_grade: string;
    main_category: string;
    image_url: string;
}

const productSchema = new Schema<Product>({
    code: { type: String },
    status: { type: String },
    imported_t: { type: String },
    url: { type: String },
    creator: { type: String },
    created_t: { type: Number },
    last_modified_t: { type: Number },
    product_name: { type: String },
    quantity: { type: String },
    brands: { type: String },
    categories: { type: String },
    labels: { type: String },
    cities: { type: String, default: '' },
    purchase_places: { type: String },
    stores: { type: String },
    ingredients_text: { type: String },
    traces: { type: String },
    serving_size: { type: String },
    serving_quantity: { type: Number },
    nutriscore_score: { type: Number },
    nutriscore_grade: { type: String },
    main_category: { type: String },
    image_url: { type: String }
});

export const ProductModel = model<Product>('Product', productSchema);