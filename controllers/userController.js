const UserModel = require("../models/user");

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      // if we got an id but no user, that means the user was not found in the database and need to create a user
      if (userId) {
        const newUser = await UserModel.addUser({ uid: userId });
        if (newUser) {
          res.json(newUser);
        } else {
          res.status(400).json({ message: "Unable to create user" });
        }
      }
      // if we got no id, that means the user is not logged in
      else {
        res.status(400).json({ message: "User not logged in" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createUser = async (req, res) => {
  const user = req.body;

  try {
    const userId = await UserModel.addUser(user); // This should return the inserted UserID
    console.log("Returned User ID:", userId); // Add this line to log the returned value

    if (userId) {
      res
        .status(201)
        .json({ message: "User created", location: `/api/users/${userId}` });
    } else {
      res.status(400).json({ message: "Unable to create user" });
    }
  } catch (error) {
    console.log("Error in createUser controller:", error); // Modify this to have a clear log of the error
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUser,
  createUser,
};
