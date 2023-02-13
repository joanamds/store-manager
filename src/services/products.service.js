const { productModel } = require('../models');
const schema = require('./validations/validationsInput');

const getProducts = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const getProductById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);

  return { type: null, message: product };
};
module.exports = {
  getProducts,
  getProductById,
};