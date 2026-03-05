const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finance_tracker",
  password: "2891",
  port: 5432,
});

module.exports = pool;