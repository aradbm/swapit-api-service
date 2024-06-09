const UserModel = require("../models/category");
const { redisClient } = require("../config/redisDB");
const getAllCategories = async (req, res) => {
  console.log("Fetching all categories...");
  try {
    const categoriesCache = await redisClient.get("categories");
    if (categoriesCache) {
      console.log("Categories fetched from cache");
      return res.json(JSON.parse(categoriesCache));
    }

    const categories = await UserModel.getCategories();
    if (!categories) {
      return res.status(500).json({ message: "Server error" });
    }

    // set cache for 10 minutes
    redisClient.setEx("categories", 600, JSON.stringify(categories));
    console.log("Categories fetched successfully");
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCategories,
};
