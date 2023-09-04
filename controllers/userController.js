const UserModel = require("../models/user");

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.getUserById(userId);
    // if we got a user, than we only need to update the user's last login time
    // else - if we got no user, we need to create a new user
    if (user) {
      const updatedUser = await UserModel.updateUser(userId);
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(400).json({ message: "Unable to update user" });
      }
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

module.exports = {
  getUser,
};
