const backpackModel = require("../models/backpack");

// get backpack items for a user with a specific id
const getBackPack = async (req, res) => {
  console.log("Fetching backpack items");
  try {
    const backpack = await backpackModel.getBackPack(req.params.id);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// get a backpack item by id
const getBackPackItem = async (req, res) => {
  console.log("Fetching backpack item");
  try {
    const backpack = await backpackModel.getBackPackItem(req.params.id);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// create a new backpack item
const createBackPack = async (req, res) => {
  console.log("Creating backpack item");
  try {
    const backpack = await backpackModel.createBackPack(req.body);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// update a backpack item
const updateBackPack = async (req, res) => {
  console.log("Updating backpack item");
  try {
    const backpack = await backpackModel.updateBackPack(
      req.params.id,
      req.body
    );
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// delete a backpack item
const deleteBackPack = async (req, res) => {
  console.log("Deleting backpack item");
  try {
    const backpack = await backpackModel.deleteBackPack(req.params.id);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBackPack,
  getBackPackItem,
  createBackPack,
  updateBackPack,
  deleteBackPack,
};
