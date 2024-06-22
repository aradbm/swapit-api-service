import backpackModel from "../models/backpack";
import swapcardModel from "../models/swapcard";
import { Request, Response } from "express";

// get backpack items for a user with a specific id
const getBackPack = async (req : Request, res : Response) => {
  try {
    const backpack = await backpackModel.getBackPack(req.params.id);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// get a backpack item by id
const getBackPackItem = async (req : Request, res : Response) => {
  try {
    const backpack = await backpackModel.getBackPackItem(req.params.id);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// create a new backpack item
const createBackPack = async (req : Request, res : Response) => {
  try {
    const backpack = await backpackModel.createBackPack(req.body);
    try {
      await swapcardModel.updateCardsByBackPack(backpack.itemid, backpack.uid);
    } catch (error) {
      console.log("Error updating swapcards:", error);
    }
    res.json(backpack.itemid);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update a backpack item
const updateBackPack = async (req : Request, res : Response) => {
  try {
    const backpack = await backpackModel.updateBackPack(
      req.params.id,
      req.body
    );
    try {
      await swapcardModel.updateCardsByBackPack(backpack.itemid, backpack.uid);
    } catch (error) {
      console.log("Error updating swapcards:", error);
    }
    res.json(backpack.itemid);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete a backpack item
const deleteBackPack = async (req : Request, res : Response) => {
  try {
    try {
      swapcardModel.deleteCardsByBackPack(req.params.id);
    } catch (error) {
      console.log("Error deleting swapcards:", error);
    }
    const backpack = await backpackModel.deleteBackPack(req.params.id);
    res.json(backpack);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getBackPack,
  getBackPackItem,
  createBackPack,
  updateBackPack,
  deleteBackPack,
};