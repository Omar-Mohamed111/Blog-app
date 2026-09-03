const validateComment = (req, res, next) => {
  const { content } = req.body;

  if (typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({
      message: "Content Is Required",
    });
  }

  next();
};

module.exports = validateComment;