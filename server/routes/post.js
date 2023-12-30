const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const checkAuthenticated = require("../lib/authMiddleware");

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

//-------------Comments----------------//

//get all comments for a post
router.get("/:post_id/comment", commentController.get_comments);

//create comment
router.post(
  "/:post_id/comment",
  checkAuthenticated,
  commentController.create_comment
);

//delete comment
router.delete(
  "/comment/:comment_id",
  checkAuthenticated,
  commentController.delete_comment
);

//like comment
router.patch(
  "/comment/:comment_id/like",
  checkAuthenticated,
  commentController.like_comment
);

module.exports = router;
