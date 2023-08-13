const db = require('../config/db');

// Function to get a user by ID
const getUserById = async (id) => {
    try {
        const user = await db.oneOrNone('SELECT * FROM "User" WHERE UserID = $1', [id]);
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addUser = async (user) => {
    console.log("Inserting user:", user);
    
    if (!user || !user.UserID || !user.UserName || !user.LastLogin || !user.UserStatus) {
        throw new Error("Invalid user data");
    }

    try {
        const result = await db.one('INSERT INTO "User"(UserID, UserName, LastLogin, UserStatus) VALUES($1, $2, $3, $4) RETURNING UserID', [user.UserID, user.UserName, user.LastLogin, user.UserStatus]);
        
        console.log("Result from DB insert:", result);
        
        return result.userid;
    } catch (error) {
        console.log("Error inserting user:", error);

        throw error;
    }
};

module.exports = {
    getUserById,
    addUser
};
