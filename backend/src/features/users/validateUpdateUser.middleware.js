const validateUpdateUser = (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  if (typeof firstName !== "string" || firstName.trim() === "") {
    return res.status(400).json({
      message: "First Name Is Required",
    });
  }

  if (typeof lastName !== "string" || lastName.trim() === "") {
    return res.status(400).json({
      message: "Last Name Is Required",
    });
  }

  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      message: "Email Is Required",
    });
  }

  if (!email.includes("@")) {
    return res.status(400).json({
      message: "Invalid Email",
    });
  }

  next()
};


module.exports = validateUpdateUser