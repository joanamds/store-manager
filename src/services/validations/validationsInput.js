const { idSchema, addProductSchema, addSalesSchema } = require('./schemas');

const validateId = (productId) => {
  const { error } = idSchema.validate(productId);

  if (error) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
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
  console.log(error);

//   if (!sale.productId) return { type: 'BAD_REQUEST', message: { message: '"productId" is required' } };
//   if (!sale.quantity) return { type: 'BAD_REQUEST', message: { message: '"quantity" is required' } };

//   if (sale.productId < 1) {
//   return {
//     type: 'INVALID_VALUE',
//     message: { message: '"productId" must be greater than or equal to 1' },
//   }; 
// }

//   if (sale.quantity < 1) {
//   return {
//     type: 'INVALID_VALUE',
//     message: { message: '"quantity" must be greater than or equal to 1' },
//   }; 
// }
};

module.exports = {
  validateId,
  validateNewProduct,
  validateSales,
};