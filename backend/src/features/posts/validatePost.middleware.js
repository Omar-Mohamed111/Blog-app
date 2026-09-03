const validationPost = (req, res, next) => {
  const { title, content } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      message: "Title Is Requierd",
    });
  }

  if (typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({
      message: "Content Is Requierd",
    });
  }


  next()

};


module.exports = validationPost