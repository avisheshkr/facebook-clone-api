const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  getPost,
  getTimelinePosts,
  getUserPosts,
} = require("../controllers/posts");
// const Post = require("../models/Post");

const router = express.Router();

// Create post
router.post("/", createPost);
// Update a post
router.patch("/:id", updatePost);
// Delete a post
router.delete("/:id", deletePost);
// Like or unlike a post
router.patch("/:id/like", likeUnlikePost);
// Get a post
router.get("/:id", getPost);
// Get all timeline posts
router.get("/timeline/:userId", getTimelinePosts);
//Get user's all posts
router.get("/profile/:username", getUserPosts);
//Get all posts
// router.get("/allUsers/all", async (req, res) => {
//   const allPosts = await Post.find();

//   res.json(allPosts);
// });

module.exports = router;
