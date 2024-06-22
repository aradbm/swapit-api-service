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
const wishlist_1 = __importDefault(require("../models/wishlist"));
const swapcard_1 = __importDefault(require("../models/swapcard"));
const getWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const wishList = yield wishlist_1.default.getWishListById(userId);
        if (wishList) {
            res.json(wishList);
        }
        else {
            res.status(404).json({ message: "WishList not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const createWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishList = req.body;
    try {
        const newWishList = yield wishlist_1.default.createWishList(wishList);
        try {
            yield swapcard_1.default.updateCardsByWishList(newWishList.itemid, newWishList.uid);
        }
        catch (error) {
            res.status(500).json({ message: "Server error" });
        }
        res.json(newWishList);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const updateWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wishList = req.body;
    const id = req.params.id;
    try {
        const updatedWishList = yield wishlist_1.default.updateWishList(id, wishList);
        try {
            yield swapcard_1.default.updateCardsByWishList(updatedWishList.itemid, updatedWishList.uid);
        }
        catch (error) {
            res.status(500).json({ message: "Server error" });
        }
        res.json(updatedWishList);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const deleteWishList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedWishList = yield wishlist_1.default.deleteWishList(id);
        res.json(deletedWishList);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getWishList,
    createWishList,
    updateWishList,
    deleteWishList,
};
