const Post = require("../models/Post");
const Comment = require("../models/Comment");

const fs = require("fs");

const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

const { body } = require("express-validator");

const isError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid parameters" });
  } else {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

//Post create POST
exports.create_post = [
  body("content").trim(),
  async (req, res) => {
    const { author_id, content } = req.body;
    let image;
    const extensions = ["jpeg", "png", "gif", "jpg"];

    if (req.file) {
      const fileExtension = req.file.filename.split(".").pop().toLowerCase();
      if (!extensions.includes(fileExtension)) {
        fs.rmSync(req.file.path);
        return res.status(400).send({ error: "Image format not supported" });
      }
      await cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
          fs.rmSync(req.file.path);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        } else {
          image = { url: result.url, id: result.public_id };
          fs.rmSync(req.file.path);
        }
      });
    }

    try {
      const newPost = new Post({ author_id, content, image });
      await newPost.save();
      const post = await newPost.populate(
        "author_id",
        "username image createdAt _id"
      );
      res.status(201).send(post);
    } catch (error) {
      isError(res, error, content);
    }
  },
];

//Get all posts GET
exports.get_all_posts = async (req, res) => {
  try {
    const { id, page } = req.query;
    const query = id ? { author_id: { $eq: id } } : {};
    const skip = (page - 1) * 10;

    const [posts, nextPage] = await Promise.all([
      await Post.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(10)
        .populate("author_id", "username image createdAt _id firstName"),
      await Post.find(query)
        .sort({ created_at: -1 })
        .skip(skip + 10)
        .limit(10)
        .populate("author_id", "username image createdAt _id firstName")
        .lean(),
    ]);

    if (posts.length === 0) return res.send({ message: "No more posts" });

    res.status(200).json({ posts, nextPage: nextPage.length });
  } catch (error) {
    isError(res, error);
  }
};

//Get a post GET
exports.get_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).populate("author_id");
    res.send(post);
  } catch (error) {
    isError(res, error);
  }
};

//Delete post DELETE
exports.delete_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const comments = await Comment.deleteMany({ post_id: post._id });
    if (comments) {
      await Post.findByIdAndDelete(post._id);
    }
    if (post.image.id) {
      await cloudinary.uploader.destroy(post.image.id, (err, res) => {
        console.log(res);
      });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    isError(res, error);
  }
};

//Get multiple posts from user GET
exports.get_multiple = async (req, res) => {
  try {
    const posts = await Post.find({ author_id: req.params.author_id }).limit(
      20
    );
    res.status(200).send(posts);
  } catch (error) {
    isError(res, error);
  }
};

//Like post PATCH
exports.like = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { user_id } = req.body;
    await Post.findByIdAndUpdate(
      { _id: post_id, likes: { $ne: user_id } },
      { $addToSet: { likes: user_id } },
      { new: true }
    );
    res.status(204).send();
  } catch (error) {
    isError(res, error);
  }
};

//Unlike post PATCH
exports.unlike = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { user_id } = req.body;
    await Post.findByIdAndUpdate(
      { _id: post_id, likes: user_id },
      { $pull: { likes: user_id } },
      { new: true }
    );
    res.status(204).send();
  } catch (error) {
    isError(res, error);
  }
};
