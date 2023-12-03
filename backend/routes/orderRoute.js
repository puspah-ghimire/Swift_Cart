import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myOrders, updateOrder } from '../controllers/orderController.js';
import { authenticateAdmin, authenticateUser } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticateUser, createOrder);
router.get('/order/:id', authenticateAdmin, getSingleOrder);
router.get('/myOrders', authenticateUser, myOrders);
router.get('/allOrders', authenticateAdmin, getAllOrders);
router.put('/update-order/:id', authenticateAdmin, updateOrder);
router.delete('/delete-order/:id', authenticateAdmin, deleteOrder);

export default router;
