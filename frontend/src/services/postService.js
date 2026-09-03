import apiFetch from "./api";

// GET /posts -> { message, posts }
export const getPosts = () => apiFetch("/posts");

// GET /posts/:id -> { message, post }
export const getPostById = (id) => apiFetch(`/posts/${id}`);

// POST /posts -> { message, post }
export const createPost = (title, content) =>
  apiFetch("/posts", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });

// PUT /posts/:id -> { message, post }
export const updatePost = (id, title, content) =>
  apiFetch(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });

// DELETE /posts/:id -> { message, post }
export const deletePost = (id) => apiFetch(`/posts/${id}`, { method: "DELETE" });
