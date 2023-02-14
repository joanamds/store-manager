const { idSchema, addProductSchema } = require('./schemas');
// const { productModel } = require('../../models');

const validateId = (productId) => {
  const { error } = idSchema.validate(productId);

  if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: '' };
};

const validateNewProduct = (newProduct) => {
  const { error } = addProductSchema.validate(newProduct);

  if (!newProduct.name) return { type: 'BAD_REQUEST', message: { message: '"name" is required' } };
  if (error) {
  return (
    { type: 'INVALID_VALUE',
    message: { message: '"name" length must be at least 5 characters long' } }
  ); 
  }
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
};