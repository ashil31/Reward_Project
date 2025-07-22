const User = require("../models/User.model");
const Reward = require("../models/Reward.model");
const QrCode = require("../models/QrCode.model");
const getRandomReward = require("../utils/rewardGenerator");
const STATUS = require("../config/statusCodes");

module.exports.claimReward = async (req, res) => {
  try {
    const { name, email, phone, cardSerialNumber, upiId, qrToken } = req.body;

    if (!name || !email || !phone || !cardSerialNumber || !qrToken) {
      return res.status(STATUS.BAD_REQUEST).json({ message: "All fields are required." });
    }

    const qrCode = await QrCode.findOne({ token: qrToken });
    if (!qrCode || qrCode.used) {
      return res.status(STATUS.BAD_REQUEST).json({ message: "QR Code invalid or already used." });
    }

    const user = await User.create({ name, email, phone, cardSerialNumber, upiId });

    const amount = getRandomReward();
    const reward = await Reward.create({ user: user._id, qrCode: qrCode._id, amount });

    qrCode.used = true;
    await qrCode.save();

    res.status(STATUS.CREATED).json({
      message: "Reward claimed successfully!",
      rewardAmount: amount,
      userId: user._id,
      rewardId: reward._id
    });
  } catch (error) {
    console.error("Error claiming reward:", error);
    res.status(STATUS.SERVER_ERROR).json({ message: "Internal server error." });
  }
};