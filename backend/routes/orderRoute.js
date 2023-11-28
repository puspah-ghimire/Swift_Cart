import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { authenticateAdmin, authenticateUser } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticateUser, createOrder);

export default router;
