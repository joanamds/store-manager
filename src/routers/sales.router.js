const express = require('express');
const { salesController } = require('../controllers');
const { validateQuantity, validateProductId } = require('../middlewares/validateSales');

const routerSales = express.Router();
const validate = [validateQuantity, validateProductId];

routerSales.post('/', validate, salesController.createSale);

module.exports = routerSales;