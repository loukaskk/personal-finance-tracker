const express = require("express");
const router = express.Router();

const {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getTransactionById,
} = require("../controllers/transactions.controller");

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/:id", getTransactionById);

module.exports = router;