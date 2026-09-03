const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authenticate = require("../../middlewares/authenticte.middleware");
const authorize = require("../../middlewares/authorize.middleware");
const validateId = require("../../middlewares/validateId.middleware");
const validateRegister = require("./validateRegister.middleware");
const validateLogin = require("./validateLogin.middleware");
const validateUpdateUser = require("./validateUpdateUser.middleware");

router.post("/register", validateRegister, userController.register);

router.post("/login", validateLogin, userController.login);

router.get("/me", authenticate, (req, res) => {
  res.json({
    user: req.user,
  });
});

router.get("/", authenticate, userController.getUsers);

router.get("/:id", authenticate, validateId("id"), userController.getUserById);

router.put("/:id", authenticate, validateId("id"), validateUpdateUser, userController.updateUser);

router.delete("/:id", authenticate, validateId("id"), userController.deleteUser);

router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;
