const { productService } = require('../services');

const validateProductId = async (req, res, next) => {
  const sales = req.body;
  
  for (let index = 0; index < sales.length; index += 1) {
    if (!sales[index].productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }

    const getProduct = productService.getProductById(sales[index].productId);
    
    if (getProduct.type !== null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    next();
  }
};

const validateQuantity = async (req, res, next) => {
  const sales = req.body;

  for (let index = 0; index < sales.length; index += 1) {
    if (sales[index].quantity <= 0) {
      return res.status(422).json({
        message: '"quantity" must be greater than or equal to 1',
      });
    }
    
    if (!sales[index].quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  next();
};

module.exports = {
  validateQuantity,
  validateProductId,
};
