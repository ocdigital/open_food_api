import { Router } from 'express';
import { getProducts, getProduct, updateProduct, deleteProduct, searchProducts } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/search', searchProducts);

router.get('/:code', getProduct);
router.put('/:code', updateProduct);
router.delete('/:code', deleteProduct);


export default router;