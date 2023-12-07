const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: String,
  email: { type: String, required: true, unique: true, min: 8 },
  firstName: { type: String, required: true, min: 2 },
  lastName: { type: String, required: true, min: 2 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", User);
