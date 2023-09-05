const db = require("../config/db");

const getSwapCardsByUser = async (uid) => {
  try {
    const query = `
      SELECT * FROM swapcards
      WHERE uid_h1 = $1 OR uid_h2 = $1 OR uid_h3 = $1
    `;
    const swapCards = await db.any(query, [uid]);
    console.log("fetching swap cards");
    return swapCards;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getSwapCardsByUser,
};
