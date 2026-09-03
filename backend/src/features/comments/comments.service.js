const commentsRepository = require("./comments.repository");
const postsRepository = require("../posts/posts.repository");

// ***************************************
const createComment = async (content, userId, postId) => {
  const post = await postsRepository.getPostById(postId);
  if (!post) {
    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  }

  const comment = await commentsRepository.createComment(
    content,
    userId,
    postId,
  );
  return comment;
};

// ***************************************
const getAllCommentsByPostId = async (postId) => {
  const post = await postsRepository.getPostById(postId);
  if (!post) {
    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  }

  const comments = await commentsRepository.getAllCommentsByPostId(postId);
  return comments;
};

// ***************************************
const getCommentById = async (id) => {
  const comment = await commentsRepository.getCommentById(id);

  if (!comment) {
    const error = new Error("Comment Not Found");
    error.statusCode = 404;
    throw error;
  }

  return comment;
};

// ***************************************
const updateComment = async (id, content, userId) => {
  const comment = await commentsRepository.getCommentById(id);
  if (!comment) {
    const error = new Error("Comment Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (comment.user_id !== Number(userId)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  const updateComment = await commentsRepository.updateComment(
    id,
    content,
    userId,
  );
  return updateComment;
};


// ***************************************
const deleteComment = async (id, userId) => {
  const comment = await commentsRepository.getCommentById(id);
  if (!comment) {
    const error = new Error("Comment Not Found");
    error.statusCode = 404;
    throw error;
  }

  if (comment.user_id !== Number(userId)) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }

  const deleteComment = await commentsRepository.deleteComment(
    id,
    userId,
  );
  return deleteComment;
};

module.exports = {
  createComment,
  getAllCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment
};
