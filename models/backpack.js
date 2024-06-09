const db = require("../config/postgresDB");

const getBackPack = async (uid) => {
  console.log("Fetching backpack for:", uid);
  try {
    const backpack = await db.any(
      "SELECT * FROM backpackitems WHERE uid = $1",
      [uid]
    );
    return backpack;
  } catch (error) {
    console.log("Error fetching backpack:", error);
    throw error;
  }
};

const getBackPackItem = async (itemid) => {
  console.log("Fetching backpack item:", itemid);
  try {
    const item = await db.oneOrNone(
      "SELECT * FROM backpackitems WHERE itemid = $1",
      [itemid]
    );
    return item;
  } catch (error) {
    console.log("Error fetching backpack item:", error);
    throw error;
  }
};

const createBackPack = async (itemData) => {
  console.log("Inserting backpack item:", itemData);
  if (!itemData.uid) {
    throw "No user ID provided";
  }
  try {
    const item = await db.one(
      "INSERT INTO backpackitems(uid, categoryid, title, description, itemstatus, color, size, originalprice, price, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING itemid",
      [
        itemData.uid,
        itemData.categoryid,
        itemData.title,
        itemData.description,
        itemData.itemstatus,
        itemData.color,
        itemData.size,
        itemData.originalprice,
        itemData.price,
        itemData.latitude,
        itemData.longitude,
      ]
    );

    return item;
  } catch (error) {
    console.log("Error inserting backpack item:", error);
    throw error;
  }
};

const updateBackPack = async (itemid, updateData) => {
  console.log("Updating backpack item:", itemid);

  try {
    const item = await db.one(
      "UPDATE backpackitems SET categoryid=$2, title=$3, description=$4, itemstatus=$5, color=$6, size=$7, originalprice=$8, price=$9, latitude=$10, longitude=$11 WHERE itemid = $1 RETURNING *",
      [
        itemid,
        updateData.categoryid,
        updateData.title,
        updateData.description,
        updateData.itemstatus,
        updateData.color,
        updateData.size,
        updateData.originalprice,
        updateData.price,
        updateData.latitude,
        updateData.longitude,
      ]
    );

    return item;
  } catch (error) {
    console.log("Error updating backpack item:", error);
    throw error;
  }
};

const deleteBackPack = async (itemid) => {
  console.log("Deleting backpack item:", itemid);

  try {
    const item = await db.oneOrNone(
      "DELETE FROM BackpackItems WHERE itemid = $1 RETURNING *",
      [itemid]
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
