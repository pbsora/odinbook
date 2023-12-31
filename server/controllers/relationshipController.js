const mongoose = require("mongoose");
const Relationship = require("../models/Relationship");
const Post = require("../models/Post");

const isError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: error.message });
  }
};

exports.get_relationship = async (req, res) => {
  try {
    const { follower, following } = req.params;
    const relationship = await Relationship.findOne({ follower, following });
    if (!relationship) res.send(false);
    else res.send(true);
  } catch (error) {
    isError(res, error);
  }
};

exports.follow = async (req, res) => {
  try {
    const { follower, following } = req.body;
    if (follower === following)
      return res.status(400).send({ error: "Already following" });

    const relationshipExist = await Relationship.findOne({
      follower,
      following,
    });
    if (relationshipExist)
      return res.status(400).send({ error: "Already following" });

    const relationship = new Relationship({ follower, following });
    await relationship.save();
    res.status(201).send(relationship);
  } catch (error) {
    isError(res, error);
  }
};

exports.unfollow = async (req, res) => {
  try {
    const { follower, following } = req.params;
    await Relationship.findOneAndDelete({ follower, following });
    res.status(200).send({ message: "Deleted successfully" });
  } catch (error) {
    isError(res, error);
  }
};

//Gets list of following users
exports.following = async (req, res) => {
  try {
    const { user_id } = req.params;
    const following = await Relationship.find({ follower: user_id });
    res.status(200).send(following);
  } catch (error) {
    isError(res, error);
  }
};

exports.following_posts = async (req, res) => {
  try {
    const { user_id } = req.params;
    const following = await Relationship.find({ follower: user_id });
    if (!following.length) return res.send({ message: "Not following anyone" });
    const followingIds = following.map((user) => user.following);
    const posts = await Post.find({ author_id: { $in: [...followingIds] } });
    res.send(posts);
  } catch (error) {
    isError(res, error);
  }
};
