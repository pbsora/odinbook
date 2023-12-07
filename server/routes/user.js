const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const passport = require("passport");

const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("user");
});

//get a user

//login
router.post("/log-in", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(info);
    if (!user) return res.send({ error: info.error });

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send({ message: "Successfully authenticated" });
    });
  })(req, res, next);
});

router.get("/log-out", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.send("Logged out");
  });
});

//register
router.post(
  "/register",
  body("username", "Username must be specified")
    .trim()
    .toLowerCase()
    .escape()
    .isLength({ min: 3 }),
  body("password", "Password must be at least 6 characters")
    .escape()
    .trim()
    .toLowerCase()
    .isLength({ min: 6 }),
  body("email", "Email must be valid")
    .trim()
    .escape()
    .toLowerCase()
    .isLength({ min: 8 }),
  body("firstName").toLowerCase().trim().escape(),
  body("lastName").toLowerCase().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(errors);

    const { username, email } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.json({ error: "User already exists" });
    console.log(userExists);

    //TODO: check if email exists
    // if (userExists.email === email)
    //   return res.json({ error: "E-mail already in use" });

    let { password } = req.body;
    password = await bcrypt.hash(password, 10);

    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username,
        password,
      });
      await newUser.save();
      res.status(200).json({ confirmation: "User created successfully" });
    } catch (error) {
      res.send(error);
    }
  }
);

//auth
router.get("/auth", (req, res) => {
  res.send([req.isAuthenticated(), req.user]);
});

//add follow

//edit user

//edit password

module.exports = router;
