const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const User = require("../models/User");

//get a user
exports.get_user = (req, res) => {
  res.send("user");
};

//login
exports.log_in = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(info);
    if (!user) return res.status(422).json({ error: info.error });

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Successfully authenticated" });
    });
  })(req, res, next);
};

exports.log_out = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
};

//register
exports.register = [
  body("username", "Username must be specified")
    .trim()
    .toLowerCase()
    .escape()
    .isLength({ min: 3 }),
  body("password", "Password must be at least 6 characters")
    .escape()
    .trim()
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
    const [userExists, emailExists] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email }),
    ]);

    //Will trigger the catch in FE
    if (userExists)
      return res.status(422).json({ error: "User already exists" });
    if (emailExists)
      return res.status(422).json({ error: "Email already in use" });

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
      res.status(201).json({ confirmation: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

//auth
exports.auth = (req, res) => {
  // res.cookie("teste", "randomstuff");
  res.send([req.isAuthenticated(), req.user]);
};

//add follow

//edit user

//edit password
