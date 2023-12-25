const index = require("../routes/post");
const express = require("express");
const request = require("supertest");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", index);

/* it("index route works", (done) => {
  request(app)
    .get("/test")
    .expect("Content-Type", /json/)
    .expect({ name: "frodo" })
    .expect(200, done);
});

it("returns the array", (done) => {
  request(app)
    .post("/test2")
    .type("form")
    .send({ item: "hey" })
    .then(() => {
      request(app)
        .get("/test2")
        .expect({ arr: ["hey"] }, done);
    });
});
 */
