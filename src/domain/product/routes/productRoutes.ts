import { Router } from 'express';
import { getProducts, getProductByCode, updateProduct, deleteProduct, searchProducts } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts);

router.get('/:code', getProductByCode);
router.put('/:code', updateProduct);
router.delete('/:code', deleteProduct);


export default router;