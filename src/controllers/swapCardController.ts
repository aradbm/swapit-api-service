import swapcardModel from "../models/swapcard";
import { Request, Response } from "express";

const getSwapCards = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid;
    const swapCards = await swapcardModel.getSwapCardsByUser(uid);
    if (!swapCards) {
      return res.status(500).json({ error: "Could not retrieve swap cards" });
    }
    res.status(200).json(swapCards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getSwapCards,
};