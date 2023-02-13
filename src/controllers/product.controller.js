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

  res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
};