import { BASE_HEADERS, baseUrl, getAuthHeaders } from "./api.js";
import { request } from "./api.js"; // Import the request helper which already uses checkResponse

// Register new user
const signup = (name, avatar, email, password) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

// Login user
const signin = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ email, password }),
  });
};

// Check token
const checkToken = () => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
};

export { signup, signin, checkToken };
