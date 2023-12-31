const router = require("express").Router();
const checkAuthenticated = require("../lib/authMiddleware");

const relationshipController = require("../controllers/relationshipController");

//Follow a user
router.post("/follow", checkAuthenticated, relationshipController.follow);

//Get list of following users
router.get("/:user_id", relationshipController.following);

//Unfollow a user
router.delete(
  "/:follower/:following",
  checkAuthenticated,
  relationshipController.unfollow
);

module.exports = router;
