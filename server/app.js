const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

const passport = require("passport");

require("./config/passport")(passport);

// const bcrypt = require("bcryptjs");
require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
mongoose.connect(process.env.DATABASE_URL).catch((err) => console.log(err));

//---------------------middleware----------------------//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    // eslint-disable-next-line no-undef
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 * 7 },
    store: MongoStore.create({
      // eslint-disable-next-line no-undef
      mongoUrl: process.env.DATABASE_URL,
      autoRemove: "native",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//--------------------end of middleware-----------------//

app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("oi");
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
