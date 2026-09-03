const validateRegister = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

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

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({
      message: "Password Is Required",
    });
  }

  next();
};

module.exports = validateRegister;
