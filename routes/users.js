const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFriends,
} = require("../controllers/users");

const router = express.Router();

// Update user
router.patch("/:id", updateUser);
// Delete user
router.delete("/:id", deleteUser);
// Get a user
router.get("/", getUser);
// Get friends
router.get("/friends/:userId", getFriends);

// Follow a user
router.patch("/:id/follow", followUser);
// Unfollow a user
router.patch("/:id/unfollow", unfollowUser);

module.exports = router;
