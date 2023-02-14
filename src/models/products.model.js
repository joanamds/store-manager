const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * from StoreManager.products',
  );

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * from StoreManager.products WHERE id = ?',
    [productId],
  );

  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product.name],
  );

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
};