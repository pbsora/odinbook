const router = require("express").Router();
const passport = require("passport");
const upload = require("../middleware/multer");
const checkAuthenticated = require("../lib/authMiddleware");

const user_controller = require("../controllers/userController");

router.post("/log-in", user_controller.log_in);

router.post("/register", user_controller.register);

router.post("/log-out", user_controller.log_out);

//Google auth

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
  })
);

//auth
router.get("/auth", user_controller.auth);

//GET a user
router.get("/:username", user_controller.get_user);

//add follow

//edit profile picture
router.patch(
  "/profile/picture",
  checkAuthenticated,
  upload.single("image"),
  user_controller.change_picture
);

//edit password

module.exports = router;
