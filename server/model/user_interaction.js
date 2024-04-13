const mongoose = require("mongoose");

const userInteractionSchema = new mongoose.Schema({
  ipAddress: String,
  deviceType: String,
  browser: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now },
});

const userInteraction = mongoose.model(
  "userInteraction",
  userInteractionSchema
);

module.exports = userInteraction;
