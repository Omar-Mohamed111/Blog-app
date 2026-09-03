const pool = require("../../config/db");

// ******************************************************************************
// Register & Login
// ******************************************************************************

// // // create new user
const createUser = async (firstName, lastName, email, password) => {
  const result = await pool.query(
    `
        INSERT INTO users
         (first_name, last_name , email , password)
         VALUES ($1,$2,$3,$4)
         RETURNING  * `,
    [firstName, lastName, email, password],
  );
  return result.rows[0];
};

// // check if email Exist
const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  return result.rows[0];
};

// ******************************************************************************
// CRUD
// ******************************************************************************

// *****************************************
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};


// *****************************************
const getUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result.rows[0];
};

// *****************************************

const updateUser = async (id, firstName, lastName, email) => {
  const result = await pool.query(
    `UPDATE users SET first_name=$1, last_name=$2, email=$3 WHERE id=$4  RETURNING *`,
    [firstName, lastName, email, id],
  );
  return result.rows[0];
};

// *****************************************
const deleteUser = async (id) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
