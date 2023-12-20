const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, max: 160, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = new mongoose.model("Post", Post);
