const express = require('express');
const { productController } = require('../controllers');

const routerProduct = express.Router();

routerProduct.get('/:id', productController.getProduct);

routerProduct.get('/', productController.listProducts);

routerProduct.post('/', productController.createProduct);

module.exports = routerProduct;
