const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

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

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({
      message: "Password Is Required",
    });
  }

  next();
};


module.exports = validateLogin