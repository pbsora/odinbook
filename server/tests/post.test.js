const app = require("./config/testServer");
const request = require("supertest");

const user = request.agent(app);
const { usersId } = require("./config/testUsers");
const { postIds } = require("./config/testPosts");
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
