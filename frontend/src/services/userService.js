import apiFetch from "./api";

// GET /users/me -> { user: req.user } (the decoded auth payload, e.g. { userId, ... })
export const getMe = () => apiFetch("/users/me");

// GET /users/:id -> { message, user } (full DB record)
export const getUserById = (id) => apiFetch(`/users/${id}`);

// PUT /users/:id -> { message, user }
// Backend requires firstName, lastName and email together (see
// validateUpdateUser.middleware.js), so all three are always sent.
export const updateUser = (id, firstName, lastName, email) =>
  apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ firstName, lastName, email }),
  });
