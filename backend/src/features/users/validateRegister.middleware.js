const validateRegister = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (typeof firstName !== "string" || firstName.trim() === "")
    throw new Error("First Name Is Required");

  if (typeof lastName !== "string" || lastName.trim() === "")
    throw new Error("Last Name Is Required");

  if (typeof email !== "string" || email.trim() === "")
    throw new Error("Email Is Required");

  if (!email.includes("@"))
    throw new Error("Invalid Email Must Incloud '@' In Your Email");

  if (typeof password !== "string" || password.trim() === "")
    throw new Error("Password Is Required");

  next();
};

module.exports = validateRegister;
