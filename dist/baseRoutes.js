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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const db = require("./config/postgresDB");
const redisDB_1 = require("./config/redisDB");
router.get("/health", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.get("/", (_req, res) => {
    // have html with a boton, when pressed it goes to api/categories
    res.send("<div style='display: flex; justify-content: center; align-items: center;'> \
        <a href='/api/categories'>Go to categories</a> \
      </div>");
});
exports.default = router;
