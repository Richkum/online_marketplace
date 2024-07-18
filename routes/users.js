import express from 'express';
import pool from '../database_config/db.js';

const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// })

// Handle favicon.ico request
router.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // Send a 204 No Content response
});
// Fetch all users
router.get('/', (req, res, next) => {
  const query = 'SELECT * FROM users';
  pool.query(query, (error, result) => {
    if (error) {
      return next(error); // Use 'return' to exit the handler
    }
    return res.status(200).json(result.rows);
  });
});

// Create a new user
router.post('/', (req, res, next) => {
  const { username } = req.body;
  const query = 'INSERT INTO users (username) VALUES ($1) RETURNING *';
  pool.query(query, [username], (error, result) => {
    if (error) {
      return next(error); // Use 'return' to exit the handler
    }
    return res.status(201).json(result.rows[0]);
  });
});

// Fetch a user by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE user_id = $1';
  pool.query(query, [id], (error, result) => {
    if (error) {
      return next(error); // Use 'return' to exit the handler
    }
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    return res.json(user);
  });
});

// Update a user
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = 'UPDATE users SET name = $1 WHERE user_id = $2 RETURNING *';
  pool.query(query, [name, id], (error, result) => {
    if (error) {
      return next(error); // Use 'return' to exit the handler
    }
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    return res.json(user);
  });
});

// Delete a user
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
  pool.query(query, [id], (error, result) => {
    if (error) {
      return next(error); // Use 'return' to exit the handler
    }
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    return res.json({ message: 'user deleted successfully' });
  });
});


export default router;

