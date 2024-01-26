const app = require("./config/testServer");
const request = require("supertest");

const user = request.agent(app);
const { usersId } = require("./config/testUsers");
const { postIds } = require("./config/testPosts");
const { commentIds } = require("./config/testComments");
require("./config/mongoTest");

it("Adds a user", async () => {
  const res = await user.post("/auth/register").send({
    username: "sora",
    password: "asdasd",
    email: "sora@gmail.com",
    firstName: "sora",
    lastName: "hoshi",
  });
  expect(res.statusCode).toBe(201);
});

it("Rejects the registration if username already exists", async () => {
  const res = await user.post("/auth/register").send({
    username: "sora",
    password: "asdasd",
    email: "sora@gmail.com",
    firstName: "sora",
    lastName: "hoshi",
  });
  expect(res.statusCode).toBe(422);
});

it("Rejects the registration if email already exists", async () => {
  const res = await user.post("/auth/register").send({
    username: "sora2",
    password: "asdasd",
    email: "sora@gmail.com",
    firstName: "sora",
    lastName: "hoshi",
  });
  expect(res.statusCode).toBe(422);
});

it("Rejects the login", async () => {
  await user
    .post("/auth/log-in")
    .send({ username: "sora", password: "asdasdasd" })
    .expect(422);
});

it("Logs in", async () => {
  const res = await user
    .post("/auth/log-in")
    .send({ username: "sora", password: "asdasd" });
  expect(res.statusCode).toBe(200);
});

it("Gets a user", async () => {
  const res = await user.get(`/auth/sora`);
  expect(res.body).toHaveProperty("username");
});

it("Fails to get a user", async () => {
  const res = await user.get(`/auth/asfsadfsfddfg`);

  expect(res.statusCode).toBe(404);
});

it("Creates a post", async () => {
  const res = await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "testando essabagaça dnv",
      author_id: usersId[0],
    });

  expect(res.statusCode).toBe(201);
});

it("Creates another post", async () => {
  const res = await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "testando dnv",
      author_id: usersId[1],
    });
  expect(res.statusCode).toBe(201);
});

it("Should return error if content is too short", async () => {
  await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "test",
      author_id: usersId[0],
    })
    .expect(400);
});

it("Gets a specific post", async () => {
  const res = await user.get(`/post/${postIds[0]}`);
  expect(res.body).toHaveProperty("content");
});

it("Creates a comment", async () => {
  const res = await user
    .post(`/post/${postIds[0]}/comment`)
    .send({ author_id: usersId[1], content: "Testing the comments with Jest" });
  expect(res.body).toHaveProperty("author_id");
  expect(res.statusCode).toBe(201);
});

it("Creates another comment", async () => {
  const res = await user.post(`/post/${postIds[0]}/comment`).send({
    author_id: usersId[2],
    content: "Testing the comments with Jest again",
  });
  expect(res.body).toHaveProperty("author_id");
  expect(res.statusCode).toBe(201);
});

it("Deletes a comment", async () => {
  const res = await user.delete(`/post/comment/${commentIds[0]}`);
  expect(res.statusCode).toBe(204);
});

it("Likes a comment", async () => {
  const res = await user
    .patch(`/post/comment/like/${commentIds[5]}`)
    .send({ user_id: usersId[2] });
  expect(res.body.likes).toBe(1);
  expect(res.statusCode).toBe(200);
});

it("Unlikes a comment", async () => {
  const res = await user
    .patch(`/post/comment/unlike/${commentIds[5]}`)
    .send({ user_id: usersId[2] });
  expect(res.body.likes).toBe(0);
  expect(res.statusCode).toBe(200);
});

it("Gives a list of posts", async () => {
  const res = await user.get("/post/");
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});

it("Gives a list of posts from a user", async () => {
  const res = await user.get(`/post/?id=${usersId[0]}`);
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});

it("Gives a list of posts from another user", async () => {
  const res = await user.get(`/post/?id=${usersId[1]}`);
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});

it("Gives a list of comments for a post", async () => {
  const res = await user.get(`/post/${postIds[0]}/comment`);
  expect(res.body.length).toBeGreaterThanOrEqual(1);
  expect(res.statusCode).toBe(200);
});

it("Follows user", async () => {
  const res = await user
    .post(`/relationship/follow`)
    .send({ follower: usersId[0], following: usersId[1] });
  expect(res.body).toHaveProperty("follower");
  expect(res.statusCode).toBe(201);
});

it("Gets current relationship", async () => {
  const res = await user.get(`/relationship/${usersId[0]}/${usersId[1]}`);
  expect(res.body).toBe(true);
  expect(res.status).toBe(200);
});

it("Rejects follow to itself", async () => {
  await user
    .post(`/relationship/follow`)
    .send({ follower: usersId[0], following: usersId[0] })
    .expect(400);
});

it("Rejects following if already following", async () => {
  const res = await user
    .post(`/relationship/follow`)
    .send({ follower: usersId[0], following: usersId[1] });
  expect(res.body).toHaveProperty("error");
  expect(res.statusCode).toBe(400);
});

it("Same user follows another user", async () => {
  const res = await user
    .post(`/relationship/follow`)
    .send({ follower: usersId[0], following: usersId[2] });
  expect(res.body).toHaveProperty("follower");
  expect(res.statusCode).toBe(201);
});

it("List all people the user is following", async () => {
  const res = await user.get(`/relationship/${usersId[0]}`);
  expect(res.body.length).toBeGreaterThanOrEqual(2);
  expect(res.statusCode).toBe(200);
});

it("Gets as list of posts from following users", async () => {
  const res = await user.get(`/relationship/post/${usersId[0]}`);
  expect(res.body.length).toBeGreaterThanOrEqual(2);
  expect(res.statusCode).toBe(200);
});

it("Gets a warning that the user is not following anyone", async () => {
  const res = await user.get(`/relationship/post/${usersId[5]}`);
  expect(res.body).toHaveProperty("message");
  expect(res.statusCode).toBe(200);
});

it("Unfollows a user", async () => {
  const res = await user.delete(`/relationship/${usersId[0]}/${usersId[1]}`);
  console.log(res.body);
  expect(res.body).toHaveProperty("message");
  expect(res.statusCode).toBe(200);
});

it("Changes the description", async () => {
  const res = await user
    .patch("/auth/profile/description")
    .send({ description: "New description", user_id: usersId[0] });
  expect(res.body).toHaveProperty("message");
  expect(res.status).toBe(200);
});

it("Changes the username", async () => {
  const res = await user
    .patch("/auth/profile/username")
    .send({ user_id: usersId[0], username: "Sorinha" });

  console.log(res.body);

  expect(res.body).toHaveProperty("username");
  expect(res.status).toBe(200);
});

it("Rejects username change if it has alreasy been changed once", async () => {
  const res = await user
    .patch("/auth/profile/username")
    .send({ user_id: usersId[0], username: "Sorinha2" });

  console.log(res.body);

  expect(res.body).toHaveProperty("error");
  expect(res.status).toBe(400);
});

it("Reject password change when they don't match", async () => {
  const res = await user.patch("/auth/profile/password/new").send({
    password: "teste",
    confirm_password: "testea",
    user_id: usersId[0],
  });

  expect(res.body).toHaveProperty("error");
  expect(res.status).toBe(400);
});

it("Changes the password", async () => {
  const res = await user.patch("/auth/profile/password/new").send({
    password: "teste",
    confirm_password: "teste",
    user_id: usersId[0],
  });

  expect(res.body).toHaveProperty("success");
  expect(res.status).toBe(200);
});

it("Changes the name of the user", async () => {
  const res = await user.patch("/auth/profile/name").send({
    firstName: "Sorinha",
    lastName: "Hoshizinho",
    user_id: usersId[0],
  });

  expect(res.body).toHaveProperty("firstName");
  expect(res.status).toBe(200);
});

it("Logs out", async () => {
  await user.post("/auth/log-out").expect(200);
});

it("Reject a post if user not signed in", async () => {
  const res = await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "testando essabagaça dnv",
      author_id: "65808cbf5978578b744655ec",
    });

  expect(res.statusCode).toBe(401);
});

it("Rejects a comment if user not signed in", async () => {
  const res = await user
    .post(`/post/${postIds[0]}/comment`)
    .send({ author_id: usersId[1], content: "Testing the comments with Jest" });
  expect(res.statusCode).toBe(401);
});

it("Rejects deletion of a comment if not signed in", async () => {
  const res = await user.delete(`/post/comment/${commentIds[1]}`);
  expect(res.statusCode).toBe(401);
});
