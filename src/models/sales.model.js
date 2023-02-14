const snakeize = require('snakeize');
const connection = require('./connection');

const insertSales = async (sales) => {
  const columns = Object.keys(snakeize(sales)).join(', ');

  const placeholders = Object.keys(sales)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (${columns}) VALUES (${placeholders}) 
    INSERT INTO StoreManager.sales_products (${columns} VALUES (${placeholders}))`,
    [...Object.values(sales)],
  );

  return insertId;
};

module.exports = {
  insertSales,
};