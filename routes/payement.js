import express from "express";
import pool from "../database_config/db.js";

const router = express.Router();

// Fetch all payements
router.get('/', (req, res, next) => {
  const query = 'SELECT * FROM payements';
  pool.query(query, (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json(result.rows);
  });
});

// Create a new payement
router.post('/', (req, res, next) => {
  const { payement } = req.body;
  const query = 'INSERT INTO payements (payement) VALUES ($1) RETURNING *';
  pool.query(query, [payement], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(201).json(result.rows[0]);
  });
});

// Fetch an payement by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM payements WHERE payement_id = $1';
  pool.query(query, [id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const payement = result.rows[0];
    if (!payement) {
      return res.status(404).json({ error: 'payement not found' });
    }
    return res.json(payement);
  });
});

// Update an payement
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { payement } = req.body;
  const query = 'UPDATE payements SET payement = $1 WHERE payement_id = $2 RETURNING *';
  pool.query(query, [payement, id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const payement = result.rows[0];
    if (!payement) {
      return res.status(404).json({ error: 'payement not found' });
    }
    return res.json(payement);
  });
});

// Delete an payement
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM payements WHERE payement_id = $1 RETURNING *';
  pool.query(query, [id], (error, result) => {
    if (error) {
      next(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const payement = result.rows[0];
    if (!payement) {
      return res.status(404).json({ error: 'payement not found' });
    }
    return res.json({ message: 'payement deleted successfully' });
  });
});

export default router;
