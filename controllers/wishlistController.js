const wishListModel = require("../models/wishList");

const getWishList = async (req, res) => {
  const userId = req.params.id;

  try {
    const wishList = await wishListModel.getWishListById(userId);

    if (wishList) {
      res.json(wishList);
    } else {
      res.status(404).json({ message: "WishList not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createWishList = async (req, res) => {
  console.log("Creating new wishlist item:", req.body);
  const wishList = req.body;
  try {
    const newWishList = await wishListModel.createWishList(wishList);
    res.json(newWishList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateWishList = async (req, res) => {
  const wishList = req.body;
  const id = req.params.id;

  try {
    const updatedWishList = await wishListModel.updateWishList(id, wishList);
    res.json(updatedWishList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteWishList = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedWishList = await wishListModel.deleteWishList(id);
    res.json(deletedWishList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  getWishList,
  createWishList,
  updateWishList,
  deleteWishList,
};
