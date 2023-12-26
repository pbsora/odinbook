const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./config/mongo");
const logger = require("morgan");

const passport = require("passport");

require("./config/passport")(passport);

require("dotenv").config();
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

//---------------------middleware----------------------//

app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("tiny"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 * 7, httpOnly: true },
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      autoRemove: "native",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//--------------------end of middleware-----------------//

app.use("/auth", userRoutes);
app.use("/post", postRoutes);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
