const mongoose = require("mongoose");
const Post = require("../models/Post");
const { body } = require("express-validator");

const isError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid parameters" });
  } else {
    res.status(500).json({ error: "Server error" });
  }
};

//Post create POST
exports.create_post = [
  body("content").trim().escape(),
  async (req, res) => {
    const { author_id, content } = req.body;
    try {
      const newPost = new Post({ author_id, content });
      await newPost.save();
      res.status(201).json({ message: "Created successfully" });
    } catch (error) {
      isError(res, error);
    }
  },
];

//Get all posts GET
exports.get_all_posts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ created_at: -1 })
      .limit(10)
      .populate("author_id", "username image createdAt _id");
    res.status(200).send(posts);
  } catch (error) {
    res.send(error.message);
  }
};

//Get a post GET
exports.get_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    res.send(post);
  } catch (error) {
    isError(res, error);
  }
};

//Delete post DELETE
exports.delete_post = async (req, res) => {
  try {
    console.log(req.params.post_id);
    await Post.findByIdAndDelete(req.params.post_id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    isError(res, error);
  }
};

//Get multiple posts from user GET
exports.get_multiple = async (req, res) => {
  try {
    const posts = await Post.find({ author_id: req.params.author_id });
    res.status(200).send(posts);
  } catch (error) {
    isError(res, error);
  }
};
