const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: function (props) {
        return `${props.value} is not a valid username!`;
      },
    },
  },
  password: String,
  email: { type: String, required: true, unique: true, minLength: 8 },
  firstName: { type: String, required: true, minLength: 2 },
  lastName: { type: String, minLength: 2 },
  loginType: { type: String, default: "Local" },
  createdAt: { type: Date, default: Date.now },
  image: {
    url: {
      type: String,
      default: "http://localhost:5000/default_user.png",
    },
    id: { type: String, default: "Default" },
  },
  description: {
    type: String,
    default: "Hi, i'm using Momiji. How about we follow each other",
  },
});

module.exports = mongoose.model("User", User);
