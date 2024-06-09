const express = require("express");
const db = require("./config/postgresDB");
const bodyParser = require("body-parser");
const apiRoutes = require("./apiRoutes");
const { redisClient, initializeRedis } = require("./config/redisDB");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Check postgres connectivity
    await db.query("SELECT 1");
    // Check Redis connectivity, set and get key Arad
    await redisClient.set("test", "success");
    const testRes = await redisClient.get("test");
    console.log("testRes", testRes);
    // Check if Redis key is set
    if (testRes !== "success") {
      throw new Error("Redis key test is not set");
    }

    res.status(200).json({
      status: "OK",
      message: "Server, database, and Redis are all connected",
    });
  } catch (error) {
    console.error("Connectivity error:", error);
    res.status(500).json({ status: "ERROR", message: "Connectivity issue" });
  } finally {
    await redisClient.del("test");
  }
});

const startServer = async () => {
  try {
    await initializeRedis();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

startServer();
