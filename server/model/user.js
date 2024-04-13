const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  addresses: {
    type: [
      {
        addressLine1: String,
        addressLine2: String,
        addressLine3: String,
      },
    ],
    default: []
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
