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
const bodyParser = require("body-parser");
const apiRoutes_1 = __importDefault(require("./apiRoutes"));
const baseRoutes_1 = __importDefault(require("./baseRoutes"));
const redisDB_1 = require("./config/redisDB");
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use("/", baseRoutes_1.default);
app.use("/api", apiRoutes_1.default);
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
