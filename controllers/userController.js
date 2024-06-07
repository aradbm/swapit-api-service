const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const secretKey = process.env.SECRET_KEY; // Get the secret key from environment variables

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.getUserById(userId);
    if (user) {
      const updatedUser = await UserModel.updateUser(userId);
      if (updatedUser) {
        // Generate a JWT token
        const token = jwt.sign({ userId: updatedUser.uid }, secretKey);
        res.json({ user: updatedUser, token });
      } else {
        res.status(400).json({ message: "Unable to update user" });
      }
    } else {
      const newUser = await UserModel.addUser({ uid: userId });
      if (newUser) {
        // Generate a JWT token
        const token = jwt.sign({ userId: newUser.uid }, secretKey);
        res.json({ user: newUser, token });
      } else {
        res.status(400).json({ message: "Unable to create user" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUser,
};
