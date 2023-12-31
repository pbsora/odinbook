const router = require("express").Router();

const relationshipController = require("../controllers/relationshipController");

//Follow a user
router.post("/follow", relationshipController.follow);

//Get list of following users
router.get("/:user_id", relationshipController.following);

//Unfollow a user
router.delete("/:follower/:following", relationshipController.unfollow);

module.exports = router;
