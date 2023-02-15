const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/:id', productController.getProduct);

router.get('/', productController.listProducts);

router.post('/', productController.createProduct);

module.exports = router;
