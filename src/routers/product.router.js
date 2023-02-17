const express = require('express');
const { productController } = require('../controllers');

const routerProduct = express.Router();

routerProduct.get('/search', productController.searchProduct);
routerProduct.get('/:id', productController.getProduct);
routerProduct.get('/', productController.listProducts);
routerProduct.post('/', productController.createProduct);
routerProduct.put('/:id', productController.updateProduct);
routerProduct.delete('/:id', productController.deleteProductById);

module.exports = routerProduct;
