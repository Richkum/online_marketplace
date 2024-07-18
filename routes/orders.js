import express from "express";
import pool from "../database_config/db.js";

const router = express.Router();

// Fetch all orders
router.get('/', (req, res, next) => {
  const query = 'SELECT * FROM orders';
  pool.query(query, (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json(result.rows);
  });
});

// Create a new order
router.post('/', (req, res, next) => {
  const { order } = req.body;
  const query = 'INSERT INTO orders (order) VALUES ($1) RETURNING *';
  pool.query(query, [order], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json(result.rows[0]);
  });
});

// Fetch an order by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM orders WHERE order_id = $1';
  pool.query(query, [id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const order = result.rows[0];
    if (!order) {
      return res.status(404).json({ error: 'order not found' });
    }
    return res.json(order);
  });
});

// Update an order
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { order } = req.body;
  const query = 'UPDATE orders SET order = $1 WHERE order_id = $2 RETURNING *';
  pool.query(query, [order, id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const order = result.rows[0];
    if (!order) {
      return res.status(404).json({ error: 'order not found' });
    }
    return res.json(order);
  });
});

// Delete an order
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM orders WHERE order_id = $1 RETURNING *';
  pool.query(query, [id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const order = result.rows[0];
    if (!order) {
      return res.status(404).json({ error: 'order not found' });
    }
    return res.json({ message: 'order deleted successfully' });
  });
});

export default router;
