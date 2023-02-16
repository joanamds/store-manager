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

const createProduct = async (name) => {
  const error = schema.validateNewProduct(name);
  if (error.type) return error;

  const id = await productModel.insertProduct(name);

  return { type: null, message: { id, name } };
};

const updateById = async (id, product) => {
  const error = schema.validateNewProduct(product.name);
  if (error.type) return error;

  const existProduct = await productModel.findById(id);

  if (!existProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  const newProduct = await productModel.updateProductById(id, product);
  return { type: null, message: newProduct };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateById,
};