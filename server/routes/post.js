const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const checkAuthenticated = require("../lib/authMiddleware");

router.get("/test", (req, res) => {
  res.status(204).send();
});

//get multiple posts
router.get("/", postController.get_all_posts);

//create post
router.post("/new-post", checkAuthenticated, postController.create_post);

//get a post
router.get("/:post_id", postController.get_post);

router.delete("/:post_id", checkAuthenticated, postController.delete_post);

//get multiple posts from user
router.get("/author/:author_id", postController.get_multiple);

//like a post
router.patch("/like/:post_id", checkAuthenticated, postController.like);

//unlike a post
router.patch("/unlike/:post_id", checkAuthenticated, postController.unlike);

//get all comments for a post

//delete comment

module.exports = router;
