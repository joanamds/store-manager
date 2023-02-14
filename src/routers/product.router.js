const express = require('express');
// const { route } = require('express/lib/router');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/', productController.listProducts);

router.post('/', productController.createProduct);

router.get('/:id', productController.getProduct);

module.exports = router;
