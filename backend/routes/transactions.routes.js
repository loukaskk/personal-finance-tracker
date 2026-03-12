const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all transactions
router.get("/transactions", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// POST new transaction
router.post("/transactions", async (req, res) => {
  try {
    const { amount, type, category } = req.body;

    const result = await db.query(
      `INSERT INTO transactions (amount, type, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [amount, type, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create transaction" });
  }
});

module.exports = router;