const express = require("express");
const router = express.Router();
const userLocationController = require("../controllers/userLocationController");
router.get("/users/:id/location", userLocationController.getUserLocation);
router.post("/users/location", userLocationController.addUserLocation);
router.put("/users/location", userLocationController.updateUserLocation);
router.delete("/users/location", userLocationController.deleteUserLocation);
module.exports = router;
