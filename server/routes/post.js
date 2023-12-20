const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//create post
router.post("/new-post", postController.create_post);

//get a post
router.get("/by-post/:post_id", postController.get_post);

//get multiple posts from user
router.get("/by-author/:author_id", postController.get_multiple);

//get multiple posts

//like a post

//get all comments for a post

//delete comment

module.exports = router;
