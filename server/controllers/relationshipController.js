const mongoose = require("mongoose");
const Relationship = require("../models/Relationship");
const Post = require("../models/Post");

const isError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid credentials" });
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
      return res.status(400).send({ error: "Cannot follow self" });

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
    res.send({ message: "Deleted successfully" });
  } catch (error) {
    isError(res, error);
  }
};

//Gets count of following users
exports.relationship_count = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [following, follower, postCount] = await Promise.all([
      Relationship.find({ follower: user_id }).countDocuments(),
      Relationship.find({ following: user_id }).countDocuments(),
      Post.find({ author_id: user_id }).countDocuments(),
    ]);
    res.send({ following, follower, postCount });
  } catch (error) {
    isError(res, error);
  }
};

//Gets list of following users
exports.following = async (req, res) => {
  try {
    const { user_id } = req.params;
    const following = await Relationship.find({ follower: user_id }).populate(
      "following",
      "username firstName lastName image"
    );
    res.send(following);
  } catch (error) {
    isError(res, error);
  }
};

//Gets list of followers
exports.follower = async (req, res) => {
  try {
    const { user_id } = req.params;
    const follower = await Relationship.find({ following: user_id }).populate(
      "follower",
      "username firstName lastName image"
    );
    await res.send(follower);
  } catch (error) {
    isError(res, error);
  }
};

exports.following_posts = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { page } = req.query;
    const skip = (page - 1) * 10;
    const following = await Relationship.find({ follower: user_id });
    if (!following.length) return res.send({ message: "Not following anyone" });
    const followingIds = following.map((user) => user.following);

    const [posts, nextPage] = await Promise.all([
      await Post.find({
        author_id: { $in: [...followingIds, user_id] },
      })
        .skip(skip)
        .limit(10)
        .populate("author_id")
        .sort({ created_at: -1 }),
      await Post.find({
        author_id: { $in: [...followingIds, user_id] },
      })
        .skip(skip + 10)
        .limit(10)
        .sort({ created_at: -1 })
        .lean(),
    ]);

    res.status(200).send({ posts, nextPage: nextPage.length });
  } catch (error) {
    isError(res, error);
  }
};
