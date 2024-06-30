"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const backpackController_1 = __importDefault(require("./controllers/backpackController"));
const categoryController_1 = __importDefault(require("./controllers/categoryController"));
const swapCardController_1 = __importDefault(require("./controllers/swapCardController"));
const userController_1 = __importDefault(require("./controllers/userController"));
const wishlistController_1 = __importDefault(require("./controllers/wishlistController"));
const userLocationController_1 = __importDefault(require("./controllers/userLocationController"));
const firebaseAuthMiddleware_1 = __importDefault(require("./middleware/firebaseAuthMiddleware"));
const s3Controller_1 = __importDefault(require("./controllers/s3Controller"));
const router = (0, express_1.Router)();
// User routes
router.get("/users/:id", userController_1.default.getUser);
// Backpack routes
router.get("/backpack/:id", firebaseAuthMiddleware_1.default, backpackController_1.default.getBackPack);
router.get("/backpack/item/:id", backpackController_1.default.getBackPackItem);
router.post("/backpack", backpackController_1.default.createBackPack);
router.put("/backpack/:id", backpackController_1.default.updateBackPack);
router.delete("/backpack/:id", backpackController_1.default.deleteBackPack);
// Category routes
router.get("/categories", categoryController_1.default.getAllCategories);
// Swap card routes
router.get("/swapcards/:uid", swapCardController_1.default.getSwapCards);
// Wishlist routes
router.get("/wishlist/:id", wishlistController_1.default.getWishList);
router.post("/wishlist", wishlistController_1.default.createWishList);
router.put("/wishlist/:id", wishlistController_1.default.updateWishList);
router.delete("/wishlist/:id", wishlistController_1.default.deleteWishList);
// Location routes
router.get("/users/:id/location", userLocationController_1.default.getUserLocation);
router.post("/users/location", userLocationController_1.default.addUserLocation);
router.put("/users/location", userLocationController_1.default.updateUserLocation);
router.delete("/users/location", userLocationController_1.default.deleteUserLocation);
// Upload to S3 routes
router.get("/s3-upload-url/:itemId", s3Controller_1.default.generateUploadUrl);
exports.default = router;
