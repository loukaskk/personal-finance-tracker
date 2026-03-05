const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/db-test", async (req, res) => {
  try {
    const result = await db.query("SELECT 1 as ok");
    res.json({ db: "connected", result: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ db: "error", message: err.message });
  }
});

module.exports = router;