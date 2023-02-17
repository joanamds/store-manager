const express = require('express');
const { salesController } = require('../controllers');
const { validateQuantity, validateProductId } = require('../middlewares/validateSales');

const routerSales = express.Router();
const validate = [validateQuantity, validateProductId];

routerSales.get('/', salesController.listSales);
routerSales.post('/', validate, salesController.createSale);
routerSales.get('/:id', salesController.getSale);
routerSales.delete('/:id', salesController.deleteSale);

module.exports = routerSales;