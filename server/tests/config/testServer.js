const express = require("express");
require("../../models/User");
const post = require("../../routes/post");
const users = require("../../routes/user");
const relationship = require("../../routes/relationship");
const session = require("express-session");
const app = express();
require("dotenv").config();

const passport = require("passport");

require("../../config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/post", post);
app.use("/auth", users);
app.use("/relationship", relationship);

module.exports = app;
