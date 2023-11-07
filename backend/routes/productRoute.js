const express = require('express');
const { createProduct, getProduct, getProducts, updateProduct, deleteProduct} = require('../controllers/productController');

const router = express.Router();
router.get('/products', getProducts);
router.post('/new', createProduct);
router.get('/product/:id', getProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;