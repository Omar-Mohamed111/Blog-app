const commentsService = require("./comments.service");

// ***************************************

const createComment = async (req, res, next) => {
  try {
    const comment = await commentsService.createComment(
      req.body.content,
      req.user.userId,
      req.params.postId,
    );
    res.status(200).json({
      message: "Add Comment Successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// ***************************************
const getAllCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await commentsService.getAllCommentsByPostId(
      req.params.postId,
    );
    res.status(200).json({
      message: "Get All Comments Successfully",
      comments,
    });
  } catch (error) {
    next(error);
  }
};

// ***************************************
const getCommentById = async (req, res, next) => {
  try {
    const comment = await commentsService.getCommentById(req.params.id);
    res.status(200).json({
      message: "Get Comment By Id Successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// ***************************************
const updateComment = async (req, res, next) => {
  try {
    const comment = await commentsService.updateComment(
      req.params.id,
      req.body.content,
      req.user.userId,
    );
    res.status(200).json({
      message: "Updated Comment Successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// ***************************************
const deleteComment = async (req, res, next) => {
  try {
    const comment = await commentsService.deleteComment(
      req.params.id,
      req.user.userId,
    );
    res.status(200).json({
      message: "Comment Deleted Successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getAllCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment
};
