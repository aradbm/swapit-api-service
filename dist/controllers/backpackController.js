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
const backpackModel = require("../models/backpack");
const swapcardModel = require("../models/swapcard");
// get backpack items for a user with a specific id
const getBackPack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpackModel.getBackPack(req.params.id);
        res.json(backpack);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// get a backpack item by id
const getBackPackItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpackModel.getBackPackItem(req.params.id);
        res.json(backpack);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// create a new backpack item
const createBackPack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const backpack = yield backpackModel.createBackPack(req.body);
        try {
            yield swapcardModel.updateCardsByBackPack(backpack.itemid, backpack.uid);
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
        const backpack = yield backpackModel.updateBackPack(req.params.id, req.body);
        try {
            yield swapcardModel.updateCardsByBackPack(backpack.itemid, backpack.uid);
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
            swapcardModel.deleteCardsByBackPack(req.params.id);
        }
        catch (error) {
            console.log("Error deleting swapcards:", error);
        }
        const backpack = yield backpackModel.deleteBackPack(req.params.id);
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
