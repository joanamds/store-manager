const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/products', productController.listProducts);

router.get('/products/:id', productController.getProduct);

module.exports = router;
