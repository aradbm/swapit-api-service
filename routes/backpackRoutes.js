const express = require("express");
const router = express.Router();
const backPackController = require("../controllers/backPackController");
// get backpack items for a user with a specific id
router.get("/backpacks/:id", backPackController.getBackPack);
// get a backpack item by id
router.get("/backpacks/item/:id", backPackController.getBackPackItem);

// create a new backpack item
router.post("/backpacks", backPackController.createBackPack);

// update a backpack item
router.put("/backpacks/:id", backPackController.updateBackPack);

// delete a backpack item
router.delete("/backpacks/:id", backPackController.deleteBackPack);

module.exports = router;
