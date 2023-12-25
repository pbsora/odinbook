const app = require("./config/testServer");
const request = require("supertest");

const user = request.agent(app);
const { usersId } = require("./config/testUsers");
require("./config/mongoTest");

it("Adds a user", async () => {
  const res = await user.post("/auth/register").send({
    username: "sora",
    password: "asdasd",
    email: "sora@gmail.com",
    firstName: "sora",
    lastName: "hoshi",
  });
  console.log(usersId);
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

it("Creates a post", async () => {
  const res = await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "testando essabagaça dnv",
      author_id: "65808cbf5978578b744655ec",
    });

  expect(res.statusCode).toBe(201);
});

it("Creates another post", async () => {
  const res = await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "testando dnv",
      author_id: "6582defc4ae5d279ef66b963",
    });
  expect(res.statusCode).toBe(201);
});

it("Should return error if content is too short", async () => {
  await user
    .post("/post/new-post")
    .set("Content-Type", "application/json")
    .send({
      content: "test",
      author_id: "65808cbf5978578b744655ec",
    })
    .expect(400);
});

it("Gives a list of posts", async () => {
  const res = await user.get("/post/");
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
