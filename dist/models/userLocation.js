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
const getLocationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching location:", id);
    try {
        const location = yield postgresDB_1.default.oneOrNone("SELECT * FROM userlocations WHERE id = $1", [id]);
        return location;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
const addLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting location:", location);
    if (!location) {
        throw new Error("Invalid location data");
    }
    try {
        const result = yield postgresDB_1.default.one('INSERT INTO "userlocations"(latitude, longitude, locationname) VALUES($1, $2, $3) RETURNING *', [location.lat, location.lon, location.locationname]);
        console.log("Result from DB insert:", result);
        return result;
    }
    catch (error) {
        console.log("Error inserting location:", error);
        throw error;
    }
});
// ... (The rest of your functions will be similar)
const updateLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating location:", location);
});
const deleteLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting location:", location);
});
exports.default = { getLocationById, addLocation, updateLocation, deleteLocation };
