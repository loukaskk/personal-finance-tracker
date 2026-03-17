const express = require("express");
const router = express.Router();

const {
  getTransactions,
  createTransaction,
} = require("../controllers/transactions.controller");

router.get("/transactions", getTransactions);

router.post("/transactions", createTransaction);

module.exports = router;