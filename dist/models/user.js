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
const postgresDB_1 = __importDefault(require("../config/postgresDB"));
// Function to get a user by ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching user:", id);
    try {
        const user = yield postgresDB_1.default.oneOrNone("SELECT * FROM users WHERE uid = $1", [id]);
        return user;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
// On first login, add a user to the database usingg only the UID
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting user:", user);
    if (!user || (typeof user === "object" && !user.uid)) {
        throw new Error("Invalid user data");
    }
    try {
        const result = yield postgresDB_1.default.one('INSERT INTO "users"(uid) VALUES($1) RETURNING *', [typeof user === "string" ? user : user.uid]);
        console.log("Result from DB insert:", result);
        // return the new user
        return result;
    }
    catch (error) {
        console.log("Error inserting user:", error);
        throw error;
    }
});
// if user already exists, update the last login time
const updateUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating user:", userId);
    if (!userId) {
        throw new Error("Invalid user data");
    }
    try {
        const result = yield postgresDB_1.default.one('UPDATE "users" SET lastlogin = NOW() WHERE uid = $1 RETURNING *', [userId]);
        console.log("Result from DB update:", result);
        // return the updated user
        return result;
    }
    catch (error) {
        console.log("Error updating user:", error);
        throw error;
    }
});
exports.default = {
    getUserById,
    addUser,
    updateUser,
};
