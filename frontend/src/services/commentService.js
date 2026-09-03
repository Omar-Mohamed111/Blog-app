import apiFetch from "./api";

// Comments router is mounted at /posts in app.js, and its own routes are
// "/:postId/comments" and "/comments/:id" - so the real paths are:
//   GET/POST   /posts/:postId/comments
//   GET/PUT/DELETE /posts/comments/:id

// GET /posts/:postId/comments -> { message, comments }
export const getCommentsByPostId = (postId) => apiFetch(`/posts/${postId}/comments`);

// POST /posts/:postId/comments -> { message, comment }
export const createComment = (postId, content) =>
  apiFetch(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });

// PUT /posts/comments/:id -> { message, comment }
export const updateComment = (id, content) =>
  apiFetch(`/posts/comments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });

// DELETE /posts/comments/:id -> { message, comment }
export const deleteComment = (id) => apiFetch(`/posts/comments/${id}`, { method: "DELETE" });
