const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, maxLength: 320 },
  image: {
    url: String,
    id: String,
  },
  created_at: { type: Date, default: Date.now },
  likes: [
    {
      type: Schema.Types.ObjectId,
      references: "User",
    },
  ],
});

module.exports = new mongoose.model("Post", Post);
