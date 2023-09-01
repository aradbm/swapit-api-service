const db = require("../config/db");

const getWishListById = async (userId) => {
  console.log("Fetching wishlist for:", userId);
  try {
    const wishList = await db.any(
      "SELECT * FROM WishListItems WHERE UserID = $1",
      [userId]
    );
    return wishList;
  } catch (error) {
    console.log("Error fetching wishlist:", error);
    throw error;
  }
};

const createWishList = async (itemData) => {
  console.log("Inserting wishlist item:", itemData);

  try {
    const item = await db.one(
      "INSERT INTO WishListItems(UserID, CategoryID, MinPrice, MaxPrice, Size, Color, Description) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING ItemID",
      [
        itemData.UserID,
        itemData.CategoryID,
        itemData.MinPrice,
        itemData.MaxPrice,
        itemData.Size,
        itemData.Color,
        itemData.Description,
      ]
    );

    return item.ItemID;
  } catch (error) {
    console.log("Error inserting wishlist item:", error);
    throw error;
  }
};

const updateWishList = async (itemId, updateData) => {
  console.log("Updating wishlist item:", itemId);

  try {
    const item = await db.one(
      "UPDATE WishListItems SET CategoryID=$2, MinPrice=$3, MaxPrice=$4, Size=$5, Color=$6, Description=$7 WHERE ItemID = $1 RETURNING *",
      [
        itemId,
        updateData.CategoryID,
        updateData.MinPrice,
        updateData.MaxPrice,
        updateData.Size,
        updateData.Color,
        updateData.Description,
      ]
    );

    return item;
  } catch (error) {
    console.log("Error updating wishlist item:", error);
    throw error;
  }
};

const deleteWishList = async (itemId) => {
  console.log("Deleting wishlist item:", itemId);

  try {
    const item = await db.oneOrNone(
      "DELETE FROM WishListItems WHERE ItemID = $1 RETURNING *",
      [itemId]
    );
    return item;
  } catch (error) {
    console.log("Error deleting wishlist item:", error);
    throw error;
  }
};

module.exports = {
  getWishListById,
  createWishList,
  updateWishList,
  deleteWishList,
};
