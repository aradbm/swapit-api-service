const swapCardModel = require("../models/swapcard");

const getSwapCards = async (req, res) => {
  try {
    const uid = req.params.uid;
    const swapCards = await swapCardModel.getSwapCardsByUser(uid);
    if (!swapCards) {
      return res.status(500).json({ error: "Could not retrieve swap cards" });
    }
    res.status(200).json(swapCards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSwapCards,
};
