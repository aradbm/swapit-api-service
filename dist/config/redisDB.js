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
exports.redisClient = void 0;
exports.initializeRedis = initializeRedis;
const redis = require("redis");
// const redisUrl = "redis://redis:6379";
const redisClient = redis.createClient({
    socket: {
        host: "redis",
        port: 6379,
    },
});
exports.redisClient = redisClient;
redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
    process.exit(1);
});
redisClient.on("connect", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected to Redis");
}));
function initializeRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        yield redisClient.connect();
    });
}
