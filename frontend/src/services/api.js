// Base URL of the existing backend API (read-only, not modified here).
const BASE_URL = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

// Small wrapper around fetch() so every service file doesn't repeat
// the same headers / error-handling logic.
async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  // The backend always responds with JSON, even on errors.
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export default apiFetch;
