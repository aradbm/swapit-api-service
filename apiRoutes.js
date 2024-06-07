const express = require("express");
const router = express.Router();
const backPackController = require("./controllers/backpackController");
const categoryController = require("./controllers/categoryController");
const swapCardController = require("./controllers/swapCardController");
const userController = require("./controllers/userController");
const wishListController = require("./controllers/wishlistController");
const userLocationController = require("./controllers/userLocationController");
const firebaseAuthJWT = require("./middleware/firebaseAuthMiddleware");

// User routes
router.get("/users/:id", userController.getUser);

// Backpack routes
router.get("/backpack/:id", firebaseAuthJWT, backPackController.getBackPack);
router.get("/backpack/item/:id", backPackController.getBackPackItem);
router.post("/backpack", firebaseAuthJWT, backPackController.createBackPack);
router.put("/backpack/:id", firebaseAuthJWT, backPackController.updateBackPack);
router.delete(
  "/backpack/:id",
  firebaseAuthJWT,
  backPackController.deleteBackPack
);

// Category routes
router.get("/categories", categoryController.getAllCategories);

// Swap card routes
router.get("/swapcards/:uid", swapCardController.getSwapCards);

// Wishlist routes
router.get("/wishlist/:id", wishListController.getWishList);
router.post("/wishlist", wishListController.createWishList);
router.put("/wishlist/:id", wishListController.updateWishList);
router.delete("/wishlist/:id", wishListController.deleteWishList);

// Location routes
router.get("/users/:id/location", userLocationController.getUserLocation);
router.post("/users/location", userLocationController.addUserLocation);
router.put("/users/location", userLocationController.updateUserLocation);
router.delete("/users/location", userLocationController.deleteUserLocation);

module.exports = router;
