const { salesModel } = require('../models');

const insertSale = async (sales) => {
  const id = await salesModel.insert();
  const itemsSold = await Promise.all(sales.map(({ productId, quantity }) => {
    salesModel.insertProducts(id, productId, quantity);
    return { productId, quantity };
  }));
  
  return { type: null, message: { id, itemsSold } };
};

const getSaleById = async (saleId) => {
  const sale = await salesModel.innerSales(saleId);

  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const getAllSales = async () => {
  const sales = await salesModel.innerAllSales();

  return { type: null, message: sales };
};

const deleteSaleById = async (id) => {
  const existSale = await salesModel.innerSales(id);

  if (existSale.length === 0) {
    return {
      type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' },
    };
  }

  const deleteSale = await salesModel.deleteSale(id);
  return { type: null, message: deleteSale };
};

module.exports = {
  insertSale,
  getSaleById,
  getAllSales,
  deleteSaleById,
};