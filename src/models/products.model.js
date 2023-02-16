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

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  return insertId;
};

const updateProductById = async (productId, { name }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, productId],
  );

  const [updatedProduct] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );

  return updatedProduct;
};

module.exports = {
  findAll,
  findById,
  insertProduct,
  updateProductById,
};