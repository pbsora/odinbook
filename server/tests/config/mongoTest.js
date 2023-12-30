const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const { users, usersId } = require("./testUsers");
const { testPosts, postIds } = require("./testPosts");
const { testComments, commentIds } = require("./testComments");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });

  const Users = await Promise.all(
    users.map(async (user) => {
      return new User(user);
    })
  );
  const uIds = Users.map((user) => user.id);
  await User.insertMany([...Users]);
  usersId.push(...uIds);

  const Posts = await Promise.all(
    testPosts.map(async (post, index) => {
      return new Post({ author_id: usersId[index], content: post.content });
    })
  );
  const pIds = Posts.map((post) => post.id);
  await Post.insertMany([...Posts]);
  postIds.push(...pIds);

  const Comments = await Promise.all(
    testComments.map((comment, index) => {
      return new Comment({
        author_id: usersId[index],
        post_id: postIds[index],
        content: testComments[index].content,
      });
    })
  );
  await Comment.insertMany([...Comments]);
  const cIds = Comments.map((comment) => comment._id);
  commentIds.push(...cIds);
});

afterAll(async () => {
  await mongoose.connection.close();
});
