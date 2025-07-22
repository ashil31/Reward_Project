const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  serialNumber: String,
  token: String,
  qrImage: String,
  used: { type: Boolean, default: false },
}, {
  timestamps: true
});

module.exports = mongoose.model("QrCode", qrCodeSchema);