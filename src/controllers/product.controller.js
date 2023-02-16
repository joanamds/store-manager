const { productService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { type, message } = await productService.getProducts();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);

  if (type) return res.status(errorMap.mapError(type)).json(message);

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.createProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json(message);
  
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  const { type, message } = await productService.updateById(id, product);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  res.status(200).json(message[0]);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteById(id);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(204).json();
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProductById,
};