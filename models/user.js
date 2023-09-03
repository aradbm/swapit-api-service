const db = require("../config/db");

// Function to get a user by ID
const getUserById = async (id) => {
  console.log("Fetching user:", id);
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE uid = $1", [id]);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// On first login, add a user to the database usingg only the UID
const addUser = async (user) => {
  console.log("Inserting user:", user);

  if (!user || !user.uid) {
    throw new Error("Invalid user data");
  }

  try {
    const result = await db.one(
      'INSERT INTO "users"(uid) VALUES($1) RETURNING *',
      [user.uid]
    );

    console.log("Result from DB insert:", result);
    // return the new user
    return result;
  } catch (error) {
    console.log("Error inserting user:", error);

    throw error;
  }
};

module.exports = {
  getUserById,
  addUser,
};
