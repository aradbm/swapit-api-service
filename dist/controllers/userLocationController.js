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
const userLocation_1 = __importDefault(require("../models/userLocation"));
const getUserLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const location = yield userLocation_1.default.getLocationById(userId);
        res.json(location);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const addUserLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.body;
    try {
        const newLocation = yield userLocation_1.default.addLocation(location);
        res.json(newLocation);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const updateUserLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.body;
    try {
        const updatedLocation = yield userLocation_1.default.updateLocation(location);
        res.json(updatedLocation);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const deleteUserLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.body;
    try {
        const deletedLocation = yield userLocation_1.default.deleteLocation(location);
        res.json(deletedLocation);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = {
    getUserLocation,
    addUserLocation,
    updateUserLocation,
    deleteUserLocation,
};
