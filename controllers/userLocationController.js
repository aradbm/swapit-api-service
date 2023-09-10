const locationModel = require("../models/userLocation.js");

const getUserLocation = async (req, res) => {
  const userId = req.params.id;

  try {
    const location = await locationModel.getLocationById(userId);
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addUserLocation = async (req, res) => {
  const location = req.body;

  try {
    const newLocation = await locationModel.addLocation(location);
    res.json(newLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserLocation = async (req, res) => {
  const location = req.body;

  try {
    const updatedLocation = await locationModel.updateLocation(location);
    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserLocation = async (req, res) => {
  const location = req.body;

  try {
    const deletedLocation = await locationModel.deleteLocation(location);
    res.json(deletedLocation);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserLocation,
  addUserLocation,
  updateUserLocation,
  deleteUserLocation,
};
