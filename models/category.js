const db = require("../config/db");

const getCategories = async () => {
  try {
    const categories = await db.any("SELECT * FROM categories");
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getCategories,
};
