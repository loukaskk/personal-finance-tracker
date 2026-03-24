const express = require("express");
const router = express.Router();

const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
  updateTransaction,
} = require("../controllers/transactions.controller");

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/:id", getTransactionById);
router.put("/transactions/:id", updateTransaction);

module.exports = router;