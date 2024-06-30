const express = require("express");
const bodyParser = require("body-parser");
import apiRoutes from "./apiRoutes";
import baseRoutes from "./baseRoutes";
import { initializeRedis } from "./config/redisDB";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/", baseRoutes);
app.use("/api", apiRoutes);

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
