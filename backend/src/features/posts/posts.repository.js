const pool = require("../../config/db");

// ******************************************************************************
// CRUD
// ******************************************************************************

// *****************************************
const createPost = async (title, content, userId) => {
  const result = await pool.query(
    `INSERT INTO posts(title, content, user_id)
     VALUES($1, $2, $3)
     RETURNING *`,
    [title, content, userId],
  );

  return result.rows[0];
};

// *****************************************
const getPosts = async () => {
  const result =
    await pool.query(`SELECT posts.id, posts.title, posts.content, posts.user_id, users.first_name, users.last_name
        FROM posts
        JOIN users
        ON posts.user_id = users.id`);

  return result.rows;
};

// *****************************************
const getPostById = async (id) => {
  const result = await pool.query(
    `SELECT posts.id, posts.title, posts.content, posts.user_id, users.first_name, users.last_name
        FROM posts
        JOIN users
        ON posts.user_id = users.id
        WHERE posts.id=$1
        `,
    [id],
  );

  return result.rows[0];
};

// *****************************************
const updatePost = async (id, title, content, userId) => {
  const result = await pool.query(
    `UPDATE posts SET title=$1, content=$2 
        WHERE id=$3 AND user_id=$4
         RETURNING *`,
    [title, content, id, userId],
  );

  return result.rows[0];
};

// *****************************************
const deletePost = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM posts 
        WHERE id=$1 AND user_id=$2
         RETURNING *`,
    [id, userId],
  );

  return result.rows[0];
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
};
