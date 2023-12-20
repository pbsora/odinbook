const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//create post
router.post("/new-post", postController.create_post);

//get multiple posts
router.get("/", postController.get_all_posts);

//get a post
router.get("/:post_id", postController.get_post);

//get multiple posts from user
router.get("/author/:author_id", postController.get_multiple);

//like a post

//get all comments for a post

//delete comment

module.exports = router;
