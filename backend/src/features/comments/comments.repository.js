const pool = require("../../config/db");

// ***************************************
const createComment = async (content, userId, postId) => {
  const result = await pool.query(
    `
        INSERT INTO comments(content, user_id, post_id)
        VALUES($1, $2, $3) RETURNING * `,
    [content, userId, postId],
  );
  return result.rows[0];
};

// ***************************************
const getAllCommentsByPostId = async (postId) => {
  const result = await pool.query(`SELECT * FROM comments WHERE post_id=$1`, [
    postId,
  ]);
  return result.rows;
};

// ***************************************
const getCommentById = async (id) => {
  const result = await pool.query(`SELECT * FROM comments WHERE id=$1`, [id]);
  return result.rows[0];
};

// ***************************************
const updateComment = async (id, content, userId) => {
  const result = await pool.query(
    `UPDATE comments
     SET content = $1
     WHERE id = $2 AND user_id = $3
     RETURNING *`,
    [content, id, userId],
  );

  return result.rows[0];
};

// ***************************************
const deleteComment = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM comments
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [id, userId],
  );

  return result.rows[0];
};

module.exports = {
  createComment,
  getAllCommentsByPostId,
  getCommentById,
  updateComment,
  deleteComment,
};
