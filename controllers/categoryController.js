const UserModel = require("../models/category");

const getAllCategories = async (req, res) => {
  console.log("Fetching all categories");
  try {
    const categories = await UserModel.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllCategories,
};
