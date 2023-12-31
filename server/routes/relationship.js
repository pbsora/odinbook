const router = require("express").Router();
const checkAuthenticated = require("../lib/authMiddleware");

const relationshipController = require("../controllers/relationshipController");

//Follow a user
router.post("/follow", checkAuthenticated, relationshipController.follow);

//Get list of following users
router.get("/:user_id", relationshipController.following);

//Gets list of posts from following users
router.get(
  "/post/:user_id",
  checkAuthenticated,
  relationshipController.following_posts
);

//Gets current relationship with user
router.get(
  "/:follower/:following",
  checkAuthenticated,
  relationshipController.get_relationship
);

//Unfollow a user
router.delete(
  "/:follower/:following",
  checkAuthenticated,
  relationshipController.unfollow
);

module.exports = router;
