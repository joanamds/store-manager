const saleModel = require('../models/sales.model');

const insertSales = async (sales) => {
  const response = await Promise.all(sales.map(async (sale) => saleModel.insertSales(sale)));

  return { type: null, message: response };
};

module.exports = {
  insertSales,
};