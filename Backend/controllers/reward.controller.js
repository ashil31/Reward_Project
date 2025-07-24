const User = require("../models/User.model");
const Reward = require("../models/Reward.model");
const QrCode = require("../models/QrCode.model");
const getRandomReward = require("../utils/rewardGenerator");
const STATUS = require("../config/statusCodes");

// controllers/rewardController.js
module.exports.claimReward = async (req, res) => {
  try {
    const {
      name,
      phone,
      occupation,
      pumpSerial,
      paymentMethod,
      upiId,
      accountNumber,
      ifsc,
      beneficiaryName,
      qrToken,
    } = req.body;

    if (!name || !phone || !occupation || !pumpSerial || !paymentMethod || !qrToken) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate QR token
    const qr = await QrCode.findOne({ token: qrToken });
    if (!qr || qr.used) {
      return res.status(404).json({ message: "Invalid QR code" });
    }

    // Check if token is already used
    const existingUser = await User.findOne({ qrToken });
    if (existingUser) {
      return res.status(400).json({ message: "QR code already used" });
    }

    const user = await User.create({
      name,
      phone,
      occupation,
      pumpSerialNumber: pumpSerial,
      paymentMethod,
      upiId: paymentMethod === "upi" ? upiId : "",
      accountNumber: paymentMethod === "bank" ? accountNumber : "",
      ifsc: paymentMethod === "bank" ? ifsc : "",
      beneficiaryName: paymentMethod === "bank" ? beneficiaryName : "",
      qrToken,
      rewardAmount: reward.amount,
      used: true,
    });

    const amount = getRandomReward();
    const reward = await Reward.create({ user: user._id, qrCode: qr._id, amount });

    qr.used = true;
    await qr.save();

    res.status(201).json({ message: "Reward claimed", rewardAmount: reward.amount });
  } catch (error) {
    console.error("Error in claimReward:", error);
    res.status(500).json({ message: "Server error" });
  }
};
