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
const user_1 = __importDefault(require("../models/user"));
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables
const secretKey = process.env.SECRET_KEY; // Get the secret key from environment variables
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_1.default.getUserById(userId);
        if (user) {
            const updatedUser = yield user_1.default.updateUser(userId);
            if (updatedUser) {
                // Generate a JWT token
                const token = jwt.sign({ userId: updatedUser.uid }, secretKey);
                res.json({ user: updatedUser, token });
            }
            else {
                res.status(400).json({ message: "Unable to update user" });
            }
        }
        else {
            const newUser = yield user_1.default.addUser(userId);
            if (newUser) {
                // Generate a JWT token
                const token = jwt.sign({ userId: newUser.uid }, secretKey);
                res.json({ user: newUser, token });
            }
            else {
                res.status(400).json({ message: "Unable to create user" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getUser,
};
