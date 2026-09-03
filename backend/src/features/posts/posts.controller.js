const postService = require("./posts.service");

// *****************************************
const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body, req.user.userId);
    res.status(201).json({
      message: "posted successfuly",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// *****************************************
const getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json({
      message: "Get All Posts",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// *****************************************
const getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json({
      message: "Get Posts By Id",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// *****************************************
const updatedPost = async (req, res, next) => {
  try {
    const post = await postService.updatePost(
      req.params.id,
      req.body,
      req.user.userId,
    );
    res.status(200).json({
      message: "Post Updated successfuly",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// *****************************************
const deletePost = async (req, res, next) => {
  try {
    const post = await postService.deletePost(req.params.id, req.user.userId);
    res.status(200).json({
      message: "Post Deleted successfuly",
      post,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatedPost,
  deletePost,
};
