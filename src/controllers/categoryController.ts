import UserModel from "../models/category";
import { redisClient } from "../config/redisDB";
import { Request, Response } from "express";

const getAllCategories = async (req : Request, res : Response) => {
  console.log("Fetching all categories...");
  try {
    const categoriesCache = await redisClient.get("categories");
    if (categoriesCache) {
      console.log("Categories fetched from cache");
      return res.json(JSON.parse(categoriesCache));
    }

    const categories = await UserModel.getCategories();
    if (!categories) {
      return res.status(500).json({ message: "Server error" });
    }

    // set cache for 10 minutes
    redisClient.setEx("categories", 600, JSON.stringify(categories));
    console.log("Categories fetched successfully");
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export default {
  getAllCategories,
};