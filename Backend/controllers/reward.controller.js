const User = require("../models/User.model");
const Reward = require("../models/Reward.model");
const QrCode = require("../models/QrCode.model");
const getRandomReward = require("../utils/rewardGenerator");
const STATUS = require("../config/statusCodes");

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

    // Validate required fields
    if (!name || !phone || !occupation || !pumpSerial || !paymentMethod || !qrToken) {
      return res.status(STATUS.BAD_REQUEST).json({ message: "Missing required fields" });
    }

    // Check QR token
    const qr = await QrCode.findOne({ token: qrToken });
    if (!qr || qr.used) {
      return res.status(STATUS.NOT_FOUND).json({ message: "Invalid or already used QR code" });
    }

    const amount = getRandomReward();

    // Create user entry
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
      qrSerialNumber: qr.serialNumber,
      rewardSent: false,
    });

    // Create reward entry
    const reward = await Reward.create({
      user: user._id,
      qrCode: qr._id,
      amount,
      rewardSent: false,
    });

    // Mark QR code as used
    qr.used = true;
    await qr.save();

    res.status(STATUS.CREATED).json({
      message: "Reward claimed successfully! You'll receive it within 3 business days."
    });
  } catch (error) {
    console.error("Error in claimReward:", error);
    res.status(STATUS.SERVER_ERROR).json({ message: "Server error" });
  }
};
