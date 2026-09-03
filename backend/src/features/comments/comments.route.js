const express = require("express")
const authenticate = require("../../middlewares/authenticte.middleware")
const router = express.Router()
const commentsController = require("./comments.controller")
const validateId = require("../../middlewares/validateId.middleware")
const validateComment = require("./validateComment.middleware")

router.post("/:postId/comments" , authenticate, validateId("postId"), validateComment, commentsController.createComment )

router.get("/:postId/comments" , authenticate,  validateId("postId"), commentsController.getAllCommentsByPostId )

router.get("/comments/:id" , authenticate, validateId("id"), commentsController.getCommentById )

router.put("/comments/:id" , authenticate, validateId("id"), validateComment, commentsController.updateComment )

router.delete("/comments/:id" , authenticate,validateId("id"), commentsController.deleteComment )


module.exports = router