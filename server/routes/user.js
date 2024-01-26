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

//edit profile picture
router.patch(
  "/profile/picture",
  checkAuthenticated,
  upload.single("image"),
  user_controller.change_picture
);

//edit description
router.patch(
  "/profile/description",
  checkAuthenticated,
  user_controller.change_description
);

//edit username
router.patch(
  "/profile/username",
  checkAuthenticated,
  user_controller.change_username
);

//check if valid password
router.post(
  "/profile/password",
  checkAuthenticated,
  user_controller.confirm_password
);

//edit password
router.patch(
  "/profile/password/new",
  checkAuthenticated,
  user_controller.change_password
);

//change name
router.patch("/profile/name", checkAuthenticated, user_controller.change_name);

module.exports = router;
