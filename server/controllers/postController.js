const mongoose = require("mongoose");
const Post = require("../models/Post");
const { body } = require("express-validator");

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
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Server Error" });
      }
    }
  },
];

//Get all posts GET
exports.get_all_posts = async (req, res) => {
  try {
    const posts = await Post.find().limit(10);
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
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  }
};

//Get multiple posts from user GET
exports.get_multiple = async (req, res) => {
  try {
    const posts = await Post.find({ author_id: req.params.author_id });
    res.status(200).send(posts);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  }
};
