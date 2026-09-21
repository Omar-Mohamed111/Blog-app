const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || email.trim() === "")
    throw new Error("Email Is Required");

  if (!email.includes("@")) 
    throw new Error("Invalid Email");

  if (typeof password !== "string" || password.trim() === "")
    throw new Error("Password Is Required");

  next();
};

module.exports = validateLogin;
