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
const getWishListById = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching wishlist for:", uid);
    try {
        const wishList = yield postgresDB_1.default.any("SELECT * FROM wishlistitems WHERE uid = $1", [uid]);
        return wishList;
    }
    catch (error) {
        console.log("Error fetching wishlist:", error);
        throw error;
    }
});
const createWishList = (itemData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!itemData.uid) {
            throw "uid is required to create a wishlist item";
        }
        const item = yield postgresDB_1.default.one("INSERT INTO WishListItems(uid, categoryid, minprice, maxprice, size, color, description, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING itemid", [
            itemData.uid,
            itemData.categoryid,
            itemData.minprice,
            itemData.maxprice,
            itemData.size,
            itemData.color,
            itemData.description,
            itemData.latitude, // added latitude
            itemData.longitude, // added longitude
        ]);
        return item.itemid;
    }
    catch (error) {
        console.log("Error inserting wishlist item:", error);
        throw error;
    }
});
const updateWishList = (itemid, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating wishlist item:", itemid);
    // Check if the item exists
    try {
        const existingItem = yield postgresDB_1.default.oneOrNone("SELECT * FROM wishlistitems WHERE itemid = $1", [itemid]);
        if (!existingItem) {
            console.log(`Item with itemid ${itemid} does not exist.`);
            return null;
        }
    }
    catch (error) {
        console.log("Error checking item existence:", error);
        throw error;
    }
    // Update the item
    try {
        const item = yield postgresDB_1.default.one("UPDATE wishlistitems SET categoryid=$2, minprice=$3, maxprice=$4, size=$5, color=$6, description=$7, latitude=$8, longitude=$9 WHERE itemid = $1 RETURNING *", [
            itemid,
            updateData.categoryid,
            updateData.minprice,
            updateData.maxprice,
            updateData.size,
            updateData.color,
            updateData.description,
            updateData.latitude,
            updateData.longitude,
        ]);
        console.log("Successfuly updated wishlist item:", item.itemid);
        return item.itemid;
    }
    catch (error) {
        console.log("Error updating wishlist item:", error);
        throw error;
    }
});
const deleteWishList = (itemid) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting wishlist item:", itemid);
    try {
        const item = yield postgresDB_1.default.oneOrNone("DELETE FROM WishListItems WHERE itemid = $1 RETURNING *", [itemid]);
        return item;
    }
    catch (error) {
        console.log("Error deleting wishlist item:", error);
        throw error;
    }
});
exports.default = {
    getWishListById,
    createWishList,
    updateWishList,
    deleteWishList,
};
