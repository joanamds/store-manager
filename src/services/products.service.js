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

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };

  return { type: null, message: product };
};

const createProduct = async (newProduct) => {
  const error = schema.validateNewProduct(newProduct);
  if (error.type) return error;

  const product = await productModel.insertProduct(newProduct);
  const getProduct = await productModel.findById(product);

  return { type: null, message: getProduct };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};