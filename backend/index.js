const express = require("express");
const healthRoutes = require("./routes/health.routes");
const dbTestRoutes = require("./routes/dbtest.routes");
const transactionRoutes = require("./routes/transactions.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(healthRoutes);
app.use(dbTestRoutes);
app.use(transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});