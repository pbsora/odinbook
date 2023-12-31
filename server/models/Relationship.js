const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Relationship = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: "User" },
  following: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = new mongoose.model("Relationship", Relationship);
