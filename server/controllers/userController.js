const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const fs = require("fs");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

const User = require("../models/User");
const Relationship = require("../models/Relationship");

const isError = (res, error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ error: error.message });
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: "Invalid parameters" });
  } else {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
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
      res.status(500).json({ error: error.message });
    }
  },
];

//get a user
exports.get_user = async (req, res) => {
  try {
    const { username } = req.params;
    let user = await User.findOne({ username }).select(
      "-password -loginType -__v"
    );

    if (!user) return res.status(404).send();

    const count = await Relationship.where({
      following: user.id,
    }).countDocuments();

    //Convert form mongoose object and append follower count
    user = user.toObject();
    user.followers = count.toString();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//auth
exports.auth = (req, res) => {
  // res.cookie("teste", "randomstuff", {
  //   maxAge: 24 * 60 * 60 * 1000 * 7,
  //   httpOnly: true,
  // });
  res.send([req.isAuthenticated(), req.user]);
};

//edit profile picture
exports.change_picture = async (req, res) => {
  let image;
  const { user_id, profile_picture } = req.body;

  if (!req.file) return res.status(400).send({ error: "No image was sent" });

  const fileExtension = req.file.filename.split(".").pop().toLowerCase();
  const extensions = ["jpeg", "png", "gif", "jpg"];

  if (!extensions.includes(fileExtension)) {
    fs.rmSync(req.file.path);
    return res.status(400).send({ error: "Image format not supported" });
  }

  try {
    //Delete picture if not default
    if (profile_picture !== "Default") {
      await cloudinary.uploader.destroy(profile_picture, (err, res) => {
        console.log(res);
      });
    }

    await cloudinary.uploader.upload(
      req.file.path,
      {
        transformation: {
          width: 250,
          height: 250,
          gravity: "face",
          crop: "fill",
        },
      },
      (err, result) => {
        if (err) {
          fs.rmSync(req.file.path);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        } else {
          fs.rmSync(req.file.path);
          image = { url: result.url, id: result.public_id };
        }
      }
    );

    if (image) {
      await User.findByIdAndUpdate({ _id: user_id }, { image });
      res.send(image);
    } else {
      res.status(500).send({ error: "Something went wrong" });
    }
  } catch (error) {
    isError(res, error);
  }
};

//Change profile desc PATCH
exports.change_description = async (req, res) => {
  const { description, user_id } = req.body;

  try {
    await User.findByIdAndUpdate(
      { _id: user_id },
      { description },
      { new: true }
    );

    res.send({ message: "Updated successfully" });
  } catch (error) {
    isError(res, error);
  }
};

//Edit username PATCH
exports.change_username = async (req, res) => {
  const { user_id, username } = req.body;

  try {
    const result = await User.findByIdAndUpdate(
      { _id: user_id },
      { username },
      { new: true }
    ).select("username");

    res.status(200).send(result);
  } catch (error) {
    isError(res, error);
  }
};

//edit password
