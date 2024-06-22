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
const backpack_1 = __importDefault(require("../models/backpack"));
const swapcard_1 = __importDefault(require("../models/swapcard"));
// get backpack items for a user with a specific id
const getBackPack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpack_1.default.getBackPack(req.params.id);
        res.json(backpack);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// get a backpack item by id
const getBackPackItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpack_1.default.getBackPackItem(req.params.id);
        res.json(backpack);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// create a new backpack item
const createBackPack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpack_1.default.createBackPack(req.body);
        try {
            yield swapcard_1.default.updateCardsByBackPack(backpack.itemid, backpack.uid);
        }
        catch (error) {
            console.log("Error updating swapcards:", error);
        }
        res.json(backpack.itemid);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// update a backpack item
const updateBackPack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpack_1.default.updateBackPack(req.params.id, req.body);
        try {
            yield swapcard_1.default.updateCardsByBackPack(backpack.itemid, backpack.uid);
        }
        catch (error) {
            console.log("Error updating swapcards:", error);
        }
        res.json(backpack.itemid);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// delete a backpack item
const deleteBackPack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            swapcard_1.default.deleteCardsByBackPack(req.params.id);
        }
        catch (error) {
            console.log("Error deleting swapcards:", error);
        }
        const backpack = yield backpack_1.default.deleteBackPack(req.params.id);
        res.json(backpack);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getBackPack,
    getBackPackItem,
    createBackPack,
    updateBackPack,
    deleteBackPack,
};
