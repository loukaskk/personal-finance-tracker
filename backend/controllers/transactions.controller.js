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

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category } = req.body;

    if (typeof amount !== "number") {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Type must be income or expense" });
    }

    if (typeof category !== "string") {
      return res.status(400).json({ error: "Category must be a string" });
    }

    const result = await db.query(
      `UPDATE transactions
       SET amount = $1, type = $2, category = $3
       WHERE id = $4
       RETURNING *`,
      [amount, type, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
};