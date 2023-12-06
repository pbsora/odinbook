const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { error: "Incorrect Username" });
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

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select("-password");
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
