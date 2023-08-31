const express = require("express");
const router = express.Router();
const userController = require("../controllers/categoryController");

// get all categories
router.get("/categories", userController.getAllCategories);
