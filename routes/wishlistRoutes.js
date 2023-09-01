const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishListController");
// get all wishlists for a user by id
router.get("/wishlists/:id", wishListController.getWishList);
// create a new wishlist item for a user by id
router.post("/wishlists", wishListController.createWishList);
// update a wishlist item by id
router.put("/wishlists/:id", wishListController.updateWishList);
// delete a wishlist item by id
router.delete("/wishlists/:id", wishListController.deleteWishList);
module.exports = router;
