const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Update user
const updateUser = async (req, res) => {
  const { userId } = req.body;
  if (userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashedPassword;
      } catch (error) {
        res.status(500).json(error);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({ message: "Account updated", user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else
    return res
      .status(403)
      .json({ message: "You can only update your account!" });
};

// Delete user
const deleteUser = async (req, res) => {
  const { userId } = req.body;
  if (userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Account deleted", user });
    } catch (error) {
      res.status(500).json(error);
    }
  } else
    return res
      .status(403)
      .json({ message: "You can only delete your account!" });
};

// Get a user
const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    const { password, updatedAt, ...filteredUser } = user._doc;

    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Friends
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendLists = [];

    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;

      friendLists.push({ _id, username, profilePicture });
    });

    res.status(200).json(friendLists);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Follow a user
const followUser = async (req, res) => {
  const { userId } = req.body;
  if (userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(userId);

      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });

        res.status(200).json("User has been followed");
      } else {
        res.json("You have already followed this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  const { userId } = req.body;
  if (userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(userId);

      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });

        res.status(200).json("User has been unfollowed");
      } else {
        res.json("You haven't followed this user.");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
  getFriends,
};
