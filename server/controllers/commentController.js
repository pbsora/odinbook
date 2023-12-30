const mongoose = require("mongoose");
const Comment = require("../models/Comment");

const isError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid parameters" });
  } else {
    res.status(500).json({ error: error.message });
  }
};

//Get a list of comments GET
exports.get_comments = async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await Comment.find({ post_id })
      .populate("author_id", "_id username image")
      .sort({ created_at: -1 });
    res.status(200).send(comments);
  } catch (error) {
    isError(res, error);
  }
};

//Create a comment POST
exports.create_comment = async (req, res) => {
  try {
    const { author_id, content } = req.body;
    const { post_id } = req.params;
    const comment = new Comment({ author_id, post_id, content });
    await comment.save();
    const resComment = await comment.populate("author_id");
    res.status(201).send(resComment);
  } catch (error) {
    isError(res, error);
  }
};

//Like a comment PATCH
exports.like_comment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { user_id } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      { _id: comment_id, likes: { $ne: user_id } },
      { $addToSet: { likes: user_id } },
      { new: true }
    );
    console.log(comment.likes.length);
    res.status(200).send(comment);
  } catch (error) {
    isError(res, error);
  }
};

//Unlike comment

//Deletes a comment DELETE
exports.delete_comment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    await Comment.findByIdAndDelete(comment_id);
    res.status(204).send();
  } catch (error) {
    isError(res, error);
  }
};
