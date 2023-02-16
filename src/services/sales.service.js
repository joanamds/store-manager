const { salesModel } = require('../models');

const insertSale = async (sales) => {
  const id = await salesModel.insert();
  const itemsSold = await Promise.all(sales.map(({ productId, quantity }) => {
    salesModel.insertProducts(id, productId, quantity);
    return { productId, quantity };
  }));
  
  return { type: null, message: { id, itemsSold } };
};

module.exports = {
  insertSale,
};