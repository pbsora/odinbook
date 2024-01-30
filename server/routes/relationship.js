const router = require("express").Router();
const checkAuthenticated = require("../lib/authMiddleware");

const relationshipController = require("../controllers/relationshipController");

//Follow a user
router.post("/follow", checkAuthenticated, relationshipController.follow);

//Get list of following users
router.get("/following/:user_id", relationshipController.following);

//Get list of followers
router.get("/follower/:user_id", relationshipController.follower);

//Get count of following and followers
router.get("/count/:user_id", relationshipController.relationship_count);

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
