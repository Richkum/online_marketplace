import express from "express";
import pool from "../database_config/db.js";

const router = express.Router();



// Handle favicon.ico request
router.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Send a 204 No Content response
  });
// Fetch all products
router.get('/', (req, res, next) => {
  const query = 'SELECT * FROM products';
  pool.query(query, (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json(result.rows);
  });
});

// Create a new product
router.post('/', (req, res, next) => {
  const { product } = req.body;
  const query = 'INSERT INTO products (product) VALUES ($1) RETURNING *';
  pool.query(query, [product], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json(result.rows[0]);
  });
});

// Fetch an product by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE product_id = $1';
  pool.query(query, [id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const product = result.rows[0];
    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }
    return res.json(product);
  });
});

// Update an product
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { product } = req.body;
  const query = 'UPDATE products SET product = $1 WHERE product_id = $2 RETURNING *';
  pool.query(query, [product, id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const product = result.rows[0];
    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }
    return res.json(product);
  });
});

// Delete an product
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE product_id = $1 RETURNING *';
  pool.query(query, [id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const product = result.rows[0];
    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }
    return res.json({ message: 'product deleted successfully' });
  });
});

export default router;
