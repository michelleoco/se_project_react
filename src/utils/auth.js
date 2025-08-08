import { BASE_URL, BASE_HEADERS, getAuthHeaders } from "./api.js";
import { request } from "./api.js"; // Import the request helper which already uses checkResponse
// import { BASE_URL } from "./constants";

// Register new user
const signup = (name, avatar, email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

// Login user
const signin = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  });
};

// Check token
const checkToken = () => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
};

export { signup, signin, checkToken };
