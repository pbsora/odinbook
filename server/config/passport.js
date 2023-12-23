const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({
          $or: [{ username }, { email: username }],
        });
        console.log(user);
        if (!user) return done(null, false, { error: "Incorrect Credentials" });
        if (user.loginType === "Google")
          return done(null, false, { error: "Please login with Google" });
        //compare password and hashed password
        const result = await bcrypt.compare(password, user.password);
        if (result) return done(null, user);
        else return done(null, false, { error: "Incorrect Password" });
      } catch (error) {
        console.log(error);
        return done(error);
      }
    })
  );

  //Google auth

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile"],
        state: true,
      },
      async function verify(accessToken, refreshToken, profile, cb) {
        const userData = profile._json;

        let user = await User.findOne({ email: userData.email });
        if (!user) {
          const newUser = new User({
            username: userData.email.split("@")[0].toLowerCase(),
            email: userData.email.toLowerCase(),
            firstName: userData.given_name.toLowerCase(),
            lastName: userData.family_name?.toLowerCase(),
            loginType: "Google",
            image: userData.picture,
          });
          await newUser.save();
          return cb(null, newUser);
        } else {
          return cb(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select("-password -__v");
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
