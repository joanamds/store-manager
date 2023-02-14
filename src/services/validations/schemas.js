const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const addSalesSchema = Joi.object({
  productId: Joi.number().min(1).isRequired,
  quantity: Joi.number().min(1).isRequired,
});

module.exports = {
  idSchema,
  addProductSchema,
  addSalesSchema,
};