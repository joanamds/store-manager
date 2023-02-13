const { idSchema } = require('./schemas');
// const { productModel } = require('../../models');

const validateId = (productId) => {
  const { error } = idSchema.validate(productId);

  if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};