const db = require("../config/postgresDB");

const getWishListById = async (uid) => {
  console.log("Fetching wishlist for:", uid);
  try {
    const wishList = await db.any(
      "SELECT * FROM wishlistitems WHERE uid = $1",
      [uid]
    );
    return wishList;
  } catch (error) {
    console.log("Error fetching wishlist:", error);
    throw error;
  }
};

const createWishList = async (itemData) => {
  try {
    if (!itemData.uid) {
      throw "uid is required to create a wishlist item";
    }
    const item = await db.one(
      "INSERT INTO WishListItems(uid, categoryid, minprice, maxprice, size, color, description, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING itemid",
      [
        itemData.uid,
        itemData.categoryid,
        itemData.minprice,
        itemData.maxprice,
        itemData.size,
        itemData.color,
        itemData.description,
        itemData.latitude, // added latitude
        itemData.longitude, // added longitude
      ]
    );
    return item.itemid;
  } catch (error) {
    console.log("Error inserting wishlist item:", error);
    throw error;
  }
};

const updateWishList = async (itemid, updateData) => {
  console.log("Updating wishlist item:", itemid);

  // Check if the item exists
  try {
    const existingItem = await db.oneOrNone(
      "SELECT * FROM wishlistitems WHERE itemid = $1",
      [itemid]
    );
    if (!existingItem) {
      console.log(`Item with itemid ${itemid} does not exist.`);
      return null;
    }
  } catch (error) {
    console.log("Error checking item existence:", error);
    throw error;
  }

  // Update the item
  try {
    const item = await db.one(
      "UPDATE wishlistitems SET categoryid=$2, minprice=$3, maxprice=$4, size=$5, color=$6, description=$7, latitude=$8, longitude=$9 WHERE itemid = $1 RETURNING *",
      [
        itemid,
        updateData.categoryid,
        updateData.minprice,
        updateData.maxprice,
        updateData.size,
        updateData.color,
        updateData.description,
        updateData.latitude,
        updateData.longitude,
      ]
    );
    console.log("Successfuly updated wishlist item:", item.itemid);
    return item.itemid;
  } catch (error) {
    console.log("Error updating wishlist item:", error);
    throw error;
  }
};

const deleteWishList = async (itemid) => {
  console.log("Deleting wishlist item:", itemid);

  try {
    const item = await db.oneOrNone(
      "DELETE FROM WishListItems WHERE itemid = $1 RETURNING *",
      [itemid]
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
