import express from 'express';
import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';
import { authenticateAdmin } from '../Middleware/authMiddleware.js';

const router = express.Router();
router.get('/products', getProducts);
router.get('/product/:id', getProduct);

// Admin-only route to create a new product
router.post('/new', authenticateAdmin, createProduct);

// Admin-only route to update a product by ID
router.put('/update/:id', authenticateAdmin, updateProduct);

// Admin-only route to delete a product by ID
router.delete('/delete/:id', authenticateAdmin, deleteProduct);

export default router;