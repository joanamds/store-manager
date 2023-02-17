const camelize = require('camelize');
const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const sales = req.body;

  const { type, message } = await salesService.insertSale(sales);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(camelize(message));
};

const listSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(404).json({ message });

  res.status(200).json(camelize(message));
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSaleById(id);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  const { type, message } = await salesService.updateSaleById(id, sales);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createSale,
  getSale,
  listSales,
  deleteSale,
  updateSale,
};