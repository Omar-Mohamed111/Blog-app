const userRepository = require("./user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const toSafeUser = (user) => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

// *****************
// Register
// *****************
const register = async ({ firstName, lastName, email, password }) => {
  
  const newUser = await userRepository.findUserByEmail(email);
  if (newUser) throw new Error("User Already Exist");

  const hashingPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.createUser(
    firstName,
    lastName,
    email,
    hashingPassword,
  );

  const safeUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return safeUser;
};

// *****************
// Login
// *****************

const login = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error("Invalid email Or password");

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Invalid email Or password");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  const safeUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return { safeUser, token };
};

// *****************
// CRUD
// *****************

const getUsers = async () => {
  const users = await userRepository.getUsers();
  const safeUsers = users.map(toSafeUser);

  return safeUsers;
};

// *****************************************

const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }
  const safeUser = toSafeUser(user);
  return safeUser;
};

// *****************************************

const updateUser = async (id, { firstName, lastName, email }) => {
  const user = await userRepository.updateUser(id, firstName, lastName, email);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }
  const safeUser = toSafeUser(user);
  return safeUser;
};


// *****************************************

const deleteUser = async(id) => {

  const user = await userRepository.deleteUser(id)
  if(!user) {
    const error = new Error("User Not Found")
    error.statusCode = 404
    throw error
  }

  const safeUser = toSafeUser(user)
  return safeUser
}


module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
