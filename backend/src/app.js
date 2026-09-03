const express = require("express");
const app = express();
const core = require("cors");
app.use(express.json());
app.use(core());
const userRouter = require("./features/users/user.route");
const postRouter = require("./features/posts/posts.route");
const commentRouter = require("./features/comments/comments.route");
const errorHandler = require("./middlewares/errorHandler.middleware");

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.use("/posts", commentRouter);

app.use(errorHandler);

module.exports = app;
