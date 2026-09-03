const express = require("express");
const router = express.Router();
const postController = require("./posts.controller");
const authenticate = require("../../middlewares/authenticte.middleware");
const validationPost = require("./validatePost.middleware");
const validateId = require("../../middlewares/validateId.middleware");

router.post("/", authenticate, validationPost, postController.createPost);

router.get("/", authenticate, postController.getPosts);

router.get("/:id", authenticate, validateId("id"), postController.getPostById);

router.put("/:id", authenticate, validateId("id"), validationPost, postController.updatedPost);

router.delete("/:id", authenticate, validateId("id"), postController.deletePost);

module.exports = router;
