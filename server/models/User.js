const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true },
  password: String,
  email: { type: String, required: true, unique: true, minLength: 8 },
  firstName: { type: String, required: true, minLength: 2 },
  lastName: { type: String, minLength: 2 },
  loginType: { type: String, default: "Local" },
  createdAt: { type: Date, default: Date.now },
  image: { type: String, default: "http://localhost:5000/default_user.png" },
});

module.exports = mongoose.model("User", User);
