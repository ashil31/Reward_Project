const express = require("express");
const router = express.Router();
const rewardController = require("../controllers/reward.controller");

router.post("/claim", rewardController.claimReward);

module.exports = router;