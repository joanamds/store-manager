const saleModel = require('../models/sales.model');

const insert = async (sales) => {
  const response = await Promise.all(sales.map(async (sale) => saleModel.insertSales(sale)));

  return { type: null, message: response };
};

module.exports = {
  insert,
};