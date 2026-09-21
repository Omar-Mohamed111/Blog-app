const validateUpdateUser = (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  if (typeof firstName !== "string" || firstName.trim() === "")
    throw new Error("First Name Is Required");

  if (typeof lastName !== "string" || lastName.trim() === "")
    throw new Error("Last Name Is Required");

  if (typeof email !== "string" || email.trim() === "")
    throw new Error("Email Is Required");

  if (!email.includes("@"))
     throw new Error("Invalid Email");

  next();
};

module.exports = validateUpdateUser;
