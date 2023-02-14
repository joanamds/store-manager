const express = require('express');
// const { route } = require('express/lib/router');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/:id', productController.getProduct);

router.get('/', productController.listProducts);

router.post('/', productController.createProduct);

module.exports = router;
