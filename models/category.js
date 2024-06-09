const CategoryModel = require("../models/category");
const redisClient = require("../config/redisDB");

const getAllCategories = async (req, res) => {
  console.log("Fetching all categories");
  try {
    // Check if the categories are cached in Redis
    console.log("got here");
    redisClient.get("categories", async (err, cachedCategories) => {
      if (err) {
        console.error("Redis error:", err);
        throw err;
      }

      if (cachedCategories) {
        // If categories are cached, return them directly
        res.json(JSON.parse(cachedCategories));
        console.log("Categories fetched from cache");
      } else {
        // If categories are not cached, fetch them from the database
        const categories = await CategoryModel.getCategories();
        console.log("Categories fetched from database");

        // Cache the categories in Redis for 1 hour
        redisClient.setex("categories", 3600, JSON.stringify(categories));

        res.json(categories);
      }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCategories,
};
