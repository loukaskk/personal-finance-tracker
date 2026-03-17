const db = require("../db");

const getTransactions = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { amount, type, category } = req.body;

    if (amount === undefined || type === undefined || category === undefined) {
      return res
        .status(400)
        .json({ message: "amount, type and category are required" });
    }

    if (typeof amount !== "number") {
      return res.status(400).json({ message: "amount must be a number" });
    }

    if (type !== "income" && type !== "expense") {
      return res
        .status(400)
        .json({ message: "type must be either income or expense" });
    }

    if (typeof category !== "string" || category.trim() === "") {
      return res
        .status(400)
        .json({ message: "category must be a non-empty string" });
    }

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
};

module.exports = {
  getTransactions,
  createTransaction,
};