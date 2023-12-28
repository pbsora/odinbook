const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  post_id: { type: Schema.Types.ObjectId, ref: "Post" },
  content: { type: String, minLength: 6, maxLength: 160 },
  created_at: { type: Date, default: Date.now },
});

module.exports = new mongoose.model("Comment", Comment);
