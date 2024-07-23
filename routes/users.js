import express from "express";
const router = express.Router();
import connection from "../database_config/db.js";


router.get("/", function (req, res, next) {
  const getquery = ` SELECT
  p.idPro,
  p.namePro,
  p.imagePro,
  p.price,
  c.nameCat
FROM products AS p
INNER JOIN categories AS c ON p.idPro = c.idPro; `;
  connection.query(getquery, (err, data) => {
    if (err) {
      // Handle the error
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (data.length === 0) {
      // Handle the case where no data is found
      return res.status(404).json({ error: 'Product not found' });
    }

    // Send the data
    res.setHeader("Content-type", "application/json");
    res.send(data);
  });
});

router.get("/categories", function (req, res, next) {
  const getquery = ` SELECT nameCat
  FROM categories;`;
  connection.query(getquery, (err, data) => {
    if (err) {
      // Handle the error
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (data.length === 0) {
      // Handle the case where no data is found
      return res.status(404).json({ error: 'No categories found' });
    }

    // Send the data
    res.setHeader("Content-type", "application/json");
    res.send(data);
  });
});

export default router;