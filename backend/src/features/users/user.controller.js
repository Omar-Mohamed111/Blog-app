const userService = require("./user.service");

// *****************
// Register
// *****************
const register = async (req, res) => {
  const user = await userService.register(req.body);
  res.status(201).json({
    message: "created user successfully",
    user,
  });
};

// *****************
// Login
// *****************

const login = async (req, res) => {
  const result = await userService.login(req.body);
  res.status(200).json({
    message: "Login Successfully",
    result,
  });
};


// *****************
// CRUD
// *****************


// *****************************************
const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({
    message: "Get All Users Successfully",
    users,
  });
};

// *****************************************

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({
      message: "Get User By Id Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};


// *****************************************
const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      message: "Updated Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};


// *****************************************
const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json({
      message: "deleted successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
