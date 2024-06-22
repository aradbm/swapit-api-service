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
const category_1 = __importDefault(require("../models/category"));
const { redisClient } = require("../config/redisDB");
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching all categories...");
    try {
        const categoriesCache = yield redisClient.get("categories");
        if (categoriesCache) {
            console.log("Categories fetched from cache");
            return res.json(JSON.parse(categoriesCache));
        }
        const categories = yield category_1.default.getCategories();
        if (!categories) {
            return res.status(500).json({ message: "Server error" });
        }
        // set cache for 10 minutes
        redisClient.setEx("categories", 600, JSON.stringify(categories));
        console.log("Categories fetched successfully");
        res.json(categories);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getAllCategories,
};
