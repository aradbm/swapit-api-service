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
const getBackPack = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching backpack for:", uid);
    try {
        const backpack = yield postgresDB_1.default.any("SELECT * FROM backpackitems WHERE uid = $1", [uid]);
        return backpack;
    }
    catch (error) {
        console.log("Error fetching backpack:", error);
        throw error;
    }
});
const getBackPackItem = (itemid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching backpack item:", itemid);
    try {
        const item = yield postgresDB_1.default.oneOrNone("SELECT * FROM backpackitems WHERE itemid = $1", [itemid]);
        return item;
    }
    catch (error) {
        console.log("Error fetching backpack item:", error);
        throw error;
    }
});
const createBackPack = (itemData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting backpack item:", itemData);
    if (!itemData.uid) {
        throw "No user ID provided";
    }
    try {
        const item = yield postgresDB_1.default.one("INSERT INTO backpackitems(uid, categoryid, title, description, itemstatus, color, size, originalprice, price, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING itemid", [
            itemData.uid,
            itemData.categoryid,
            itemData.title,
            itemData.description,
            itemData.itemstatus,
            itemData.color,
            itemData.size,
            itemData.originalprice,
            itemData.price,
            itemData.latitude,
            itemData.longitude,
        ]);
        return item;
    }
    catch (error) {
        console.log("Error inserting backpack item:", error);
        throw error;
    }
});
const updateBackPack = (itemid, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating backpack item:", itemid);
    try {
        const item = yield postgresDB_1.default.one("UPDATE backpackitems SET categoryid=$2, title=$3, description=$4, itemstatus=$5, color=$6, size=$7, originalprice=$8, price=$9, latitude=$10, longitude=$11 WHERE itemid = $1 RETURNING *", [
            itemid,
            updateData.categoryid,
            updateData.title,
            updateData.description,
            updateData.itemstatus,
            updateData.color,
            updateData.size,
            updateData.originalprice,
            updateData.price,
            updateData.latitude,
            updateData.longitude,
        ]);
        return item;
    }
    catch (error) {
        console.log("Error updating backpack item:", error);
        throw error;
    }
});
const deleteBackPack = (itemid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting backpack item:", itemid);
    try {
        const item = yield postgresDB_1.default.oneOrNone("DELETE FROM BackpackItems WHERE itemid = $1 RETURNING *", [itemid]);
        return item;
    }
    catch (error) {
        console.log("Error deleting backpack item:", error);
        throw error;
    }
});
module.exports = {
    getBackPack,
    getBackPackItem,
    createBackPack,
    updateBackPack,
    deleteBackPack,
};
