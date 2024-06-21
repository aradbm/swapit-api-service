import locationModel from "../models/userLocation";
import { Request, Response } from "express";

const getUserLocation = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const location = await locationModel.getLocationById(userId);
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addUserLocation = async (req : Request, res : Response) => {
  const location = req.body;

  try {
    const newLocation = await locationModel.addLocation(location);
    res.json(newLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserLocation = async (req : Request, res : Response) => {
  const location = req.body;

  try {
    const updatedLocation = await locationModel.updateLocation(location);
    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserLocation = async (req : Request, res : Response) => {
  const location = req.body;

  try {
    const deletedLocation = await locationModel.deleteLocation(location);
    res.json(deletedLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getUserLocation,
  addUserLocation,
  updateUserLocation,
  deleteUserLocation,
};