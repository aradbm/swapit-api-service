const express = require("express");
const db = require("./config/db"); // Import the db.js file
const bodyParser = require("body-parser");
const apiRoutes = require("./apiRoutes"); // Update the file path accordingly
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Check database connectivity
    await db.query("SELECT 1");
    // If the query succeeds, the database is connected
    res.status(200).json({
      status: "OK",
      message: "Server & Postgres database are healthy",
    });
  } catch (error) {
    // If the query fails, the database connection has an issue
    console.error("Database connectivity error:", error);
    res
      .status(500)
      .json({ status: "ERROR", message: "Database connectivity issue" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
