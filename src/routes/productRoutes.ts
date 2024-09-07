import { Router } from 'express';
import { getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:code', getProduct);
router.put('/:code', updateProduct);
router.delete('/:code', deleteProduct);

export default router;