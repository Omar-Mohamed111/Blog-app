const postsRepository = require("./posts.repository");

// *****************************************
const createPost = async ({ title, content }, userId) => {
  const post = await postsRepository.createPost(title, content, userId);
  return post;
};

// *****************************************
const getPosts = async () => {
  const posts = await postsRepository.getPosts();
  return posts;
};

// *****************************************
const getPostById = async (id) => {
  const post = await postsRepository.getPostById(id);
  if (!post) {
    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  }
  return post;
};

// *****************************************
const updatePost = async (id, { title, content }, userId) => {
  const post = await postsRepository.getPostById(id);
  if (!post) {
    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (post.user_id !== Number(userId)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  const updatedPost = await postsRepository.updatePost(
    id,
    title,
    content,
    userId,
  );
  return updatedPost;
};

// *****************************************
const deletePost = async (id, userId) => {
  const post = await postsRepository.getPostById(id);
  if (!post) {
    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (post.user_id !== Number(userId)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  const deletePost = await postsRepository.deletePost(id, userId);
  return deletePost;
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
