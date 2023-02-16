const { idSchema, addProductSchema, addSalesSchema } = require('./schemas');

const validateId = (productId) => {
  const { error } = idSchema.validate(productId);

  if (error) return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (!name) return { type: 'BAD_REQUEST', message: { message: '"name" is required' } };
  if (error) {
  return (
    { type: 'INVALID_VALUE',
    message: { message: '"name" length must be at least 5 characters long' } }
  ); 
  }
  
  return { type: null, message: '' };
};

const validateSales = (sale) => {
  const { error } = addSalesSchema.validate(sale);

  if (error) {
    const errorMessage = error.details[0].message;
    if (Object.keys(error.details[0]) === 'any.required') {
      return { type: 'BAD_REQUEST', message: errorMessage };
    }
    if (Object.keys(error.details[0]) === 'number.min') {
      return { type: 'INVALID_VALUE', message: errorMessage };
    }
  }

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSales,
};