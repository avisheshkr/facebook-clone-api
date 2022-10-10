const Post = require("../models/Post");
const User = require("../models/User");

// Create post
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (post.userId !== userId)
      return res
        .status(403)
        .json("You aren't allowed to update other user's post");

    const updatedPost = await post.updateOne({ $set: req.body });
    res.status(200).json("The post has been updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (post.userId === userId) {
      await post.deleteOne();
      return res.status(200).json("Post deleted");
    }

    res.status(403).json("You can only delete your post");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like or unlike a post
const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("You like the post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Like removed from the post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all timeline posts
const getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    const allPosts = userPosts.concat(...friendPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get user's all posts
const getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    // if (!user) return res.status(404).json("Username not found");

    const userPosts = await Post.find({ userId: user._id });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likeUnlikePost,
  getPost,
  getTimelinePosts,
  getUserPosts,
};
