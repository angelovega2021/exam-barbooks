import { DB } from '../connect.js';
import { summarizeOrders } from '../utils/utils.js';

export const getAllOrders = (req) => {
  return new Promise((resolve, reject) => {
    const { product, limit, offset } = req?.query || {};

    let sql = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (product) {
      sql += ' AND LOWER(product) LIKE ?';
      params.push(`%${product.toLowerCase()}%`);
    }

    sql += ' ORDER BY id DESC';

    if (limit) {
      sql += ' LIMIT ?';
      params.push(Number(limit));
    }
    if (offset) {
      sql += ' OFFSET ?';
      params.push(Number(offset));
    }

    DB.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      const orders = { orders: rows.map(row => ({
        id: row.id,
        product: row.product,
        qty: row.qty,
        price: row.price
      })) };
      resolve(orders);
    });
  });
}

export const getOrdersHandler = async(req, res) => {
  try {
    const orders = await getAllOrders(req);
    res.set('content-type', 'application/json');
    res.send(JSON.stringify(orders));
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
}

export const getSummaryHandler = async(req, res) => {
  try {
    const data = await getAllOrders();
    const allOrders = data.orders;
    const summary = summarizeOrders(allOrders);
    res.set('content-type', 'application/json');
    res.json(summary);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
}

export const createOrderHandler = (req, res) => {
  const { product, qty, price } = req.body;
  res.set('content-type', 'application/json');

   if (typeof price !== 'number' || isNaN(price) || price < 0) {
    return res.status(400).send({ error: 'Invalid price: must be a non-negative number.' });
  }

  if (
    typeof qty !== 'number' ||
    isNaN(qty) ||
    !Number.isInteger(qty) ||
    qty < 1
  ) {
    return res.status(400).send({ error: 'Invalid quantity: must be a non-negative integer.' });
  }

  const sql = 'INSERT INTO orders(product, qty, price) VALUES (? , ?, ?)';
  try {
    DB.run(sql, [product, qty, price], function (err) {
      if (err) {
        console.log(err.message);
        return res.status(500).send({ error: err.message });
      }
      const newId = this.lastID;
      let data = { status: 201, message: `New order ${newId} saved.` };
      res.status(201).send(JSON.stringify(data));
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: err.message });
  }
}