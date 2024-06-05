const express = require("express");
const router = express.Router();
const backPackController = require("./controllers/backpackController");
const categoryController = require("./controllers/categoryController");
const swapCardController = require("./controllers/swapCardController");
const userController = require("./controllers/userController");
const wishListController = require("./controllers/wishlistController");
const userLocationController = require("./controllers/userLocationController");

// Backpack routes
router.get("/backpack/:id", backPackController.getBackPack);
router.get("/backpack/item/:id", backPackController.getBackPackItem);
router.post("/backpack", backPackController.createBackPack);
router.put("/backpack/:id", backPackController.updateBackPack);
router.delete("/backpack/:id", backPackController.deleteBackPack);

// Category routes
router.get("/categories", categoryController.getAllCategories);

// Swap card routes
router.get("/swapcards/:uid", swapCardController.getSwapCards);

// User routes
router.get("/users/:id", userController.getUser);

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

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Check database connectivity
    await db.query("SELECT 1");
    // If the query succeeds, the database is connected
    res.status(200).json({
      status: "OK",
      message: "Server & Postgres database are healthy",
    });
  } catch (error) {
    // If the query fails, the database connection has an issue
    console.error("Database connectivity error:", error);
    res
      .status(500)
      .json({ status: "ERROR", message: "Database connectivity issue" });
  }
});

module.exports = router;
