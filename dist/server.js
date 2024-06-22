"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const db = require("./config/postgresDB");
const bodyParser = require("body-parser");
const apiRoutes_1 = __importDefault(require("./apiRoutes"));
const redisDB_1 = require("./config/redisDB");
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use("/api", apiRoutes_1.default);
// Health check endpoint
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check postgres connectivity
        yield db.query("SELECT 1");
        // Check Redis connectivity, set and get key Arad
        yield redisDB_1.redisClient.set("test", "success");
        const testRes = yield redisDB_1.redisClient.get("test");
        if (testRes !== "success") {
            throw new Error("Redis key test is not set");
        }
        res.status(200).send("<div style='display: flex; justify-content: center; align-items: center;'> \
        Server, database, and Redis are all connected \
        </div>");
    }
    catch (error) {
        console.error("Connectivity error:", error);
        res.status(500).json({ status: "ERROR", message: "Connectivity issue" });
    }
    finally {
        yield redisDB_1.redisClient.del("test");
    }
}));
app.get("/", (req, res) => {
    // have html with a boton, when pressed it goes to api/categories
    res.send("<div style='display: flex; justify-content: center; align-items: center;'> \
      <a href='/api/categories'>Go to categories</a> \
    </div>");
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, redisDB_1.initializeRedis)();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to initialize server:", error);
        process.exit(1);
    }
});
startServer();
