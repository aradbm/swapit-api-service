const db = require("../config/db");

const getBackPack = async (userId) => {
  console.log("Fetching backpack for:", userId);
  try {
    const backpack = await db.any(
      "SELECT * FROM BackpackItems WHERE UserID = $1",
      [userId]
    );
    return backpack;
  } catch (error) {
    console.log("Error fetching backpack:", error);
    throw error;
  }
};

const getBackPackItem = async (itemId) => {
  console.log("Fetching backpack item:", itemId);
  try {
    const item = await db.oneOrNone(
      "SELECT * FROM BackpackItems WHERE ItemID = $1",
      [itemId]
    );
    return item;
  } catch (error) {
    console.log("Error fetching backpack item:", error);
    throw error;
  }
};

const createBackPack = async (itemData) => {
  console.log("Inserting backpack item:", itemData);
  if (!itemData.userID) {
    throw "No user ID provided";
  }
  try {
    const item = await db.one(
      "INSERT INTO BackpackItems(UserID, CategoryID, Title, Description, ItemStatus, Color, Size, OriginalPrice, Price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ItemID",
      [
        itemData.userID,
        itemData.category,
        itemData.title,
        itemData.description,
        itemData.ItemStatus,
        itemData.color,
        itemData.size,
        itemData.originalprice,
        itemData.price,
      ]
    );

    return item.ItemID;
  } catch (error) {
    console.log("Error inserting backpack item:", error);
    throw error;
  }
};

const updateBackPack = async (itemId, updateData) => {
  console.log("Updating backpack item:", itemId);

  try {
    const item = await db.one(
      "UPDATE BackpackItems SET CategoryID=$2, Title=$3, Description=$4, ItemStatus=$5, Color=$6, Size=$7, OriginalPrice=$8, Price=$9 WHERE ItemID = $1 RETURNING *",
      [
        itemId,
        updateData.CategoryID,
        updateData.Title,
        updateData.Description,
        updateData.ItemStatus,
        updateData.Color,
        updateData.Size,
        updateData.OriginalPrice,
        updateData.Price,
      ]
    );

    return item;
  } catch (error) {
    console.log("Error updating backpack item:", error);
    throw error;
  }
};

const deleteBackPack = async (itemId) => {
  console.log("Deleting backpack item:", itemId);

  try {
    const item = await db.oneOrNone(
      "DELETE FROM BackpackItems WHERE ItemID = $1 RETURNING *",
      [itemId]
    );
    return item;
  } catch (error) {
    console.log("Error deleting backpack item:", error);
    throw error;
  }
};

module.exports = {
  getBackPack,
  getBackPackItem,
  createBackPack,
  updateBackPack,
  deleteBackPack,
};
