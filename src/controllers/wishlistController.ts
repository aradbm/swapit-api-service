import wishListModel from "../models/wishlist";
import swapcardModel from "../models/swapcard";
import { Request, Response } from "express";

const getWishList = async (req : Request, res : Response) => {
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

const createWishList = async (req : Request, res : Response) => {
  const wishList = req.body;
  try {
    const newWishList = await wishListModel.createWishList(wishList);

    try {
      await swapcardModel.updateCardsByWishList(
        newWishList.itemid,
        newWishList.uid
      );
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }

    res.json(newWishList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateWishList = async (req : Request, res : Response) => {
  const wishList = req.body;
  const id = req.params.id;

  try {
    const updatedWishList = await wishListModel.updateWishList(id, wishList);
    try {
      await swapcardModel.updateCardsByWishList(
        updatedWishList.itemid,
        updatedWishList.uid
      );
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
    res.json(updatedWishList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteWishList = async (req : Request, res : Response) => {
  const id = req.params.id;

  try {
    const deletedWishList = await wishListModel.deleteWishList(id);
    res.json(deletedWishList);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getWishList,
  createWishList,
  updateWishList,
  deleteWishList,
};