const express = require("express");
const router = express.Router();
const swapCardController = require("../controllers/swapCardController");

router.get("/swapcards/:uid", swapCardController.getSwapCards);

module.exports = router;
