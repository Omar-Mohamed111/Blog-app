import apiFetch from "./api";

// POST /users/register -> { message, user }
export const register = (firstName, lastName, email, password) => {
  return apiFetch("/users/register", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
};

// POST /users/login -> { message, result }
//
// ASSUMPTION: the uploaded backend code (user.controller.js) returns
// `result` from userService.login(), but user.service.js was not provided,
// so the exact shape of `result` is unknown. We handle the two most likely
// cases: `result` being the raw JWT string, or an object like
// `{ token: "..." }`.
export const login = async (email, password) => {
  const data = await apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const token = typeof data.result === "string" ? data.result : data.result?.token;

  if (!token) {
    throw new Error("Login succeeded but no token was found in the response.");
  }

  return token;
};
