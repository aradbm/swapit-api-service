const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
// User routes
router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUser);
// Category routes
router.get("/categories", categoryController.getAllCategories);
module.exports = router;
