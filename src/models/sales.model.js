const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return insertId;
};

const insertProducts = async (id, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );

  return result;
};

const innerSales = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT t1.date, t2.product_id, t2.quantity
    FROM StoreManager.sales AS t1
    INNER JOIN StoreManager.sales_products AS t2 ON t1.id = t2.sale_id WHERE t2.sale_id = ?`,
    [saleId],
  );

  return result;
};

const innerAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT t2.sale_id, t1.date, t2.product_id, t2.quantity
    FROM StoreManager.sales AS t1
    INNER JOIN StoreManager.sales_products AS t2 ON t1.id = t2.sale_id`,
  );

  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

const updateSale = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );

  const [updatedSale] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );

  return updatedSale;
};

module.exports = {
  insert,
  insertProducts,
  innerSales,
  innerAllSales,
  deleteSale,
  updateSale,
};
