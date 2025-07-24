const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    phone: { 
      type: String, 
      required: true  
    },
    occupation: {
      type: String, 
      required: true 
    },
    pumpSerialNumber: { 
      type: String, 
      required: true 
    }, // from `pumpSerial`
    paymentMethod: { 
      type: String, 
      enum: ["upi", "bank"], 
      required: true 
    },
    upiId: { 
      type: String 
    }, // optional if paymentMethod === "upi"
    accountNumber: { 
      type: String 
    }, // optional if paymentMethod === "bank"
    ifsc: { 
      type: String 
    },
    beneficiaryName: { 
      type: String 
    },
    qrToken: { 
      type: String, 
      required: true 
    },
    used: { 
      type: Boolean, 
      default: false 
    },
    rewardAmount: { 
      type: Number 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
