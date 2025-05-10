const baseUrl = "http://localhost:3001";
const getToken = () => {
  return localStorage.getItem("jwt");
};

const BASE_HEADERS = {
  "Content-Type": "application/json",
};

const getAuthHeaders = () => {
  const token = getToken();
  return {
    ...BASE_HEADERS,
    authorization: `Bearer ${token}`,
  };
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: BASE_HEADERS,
  });
}

function removeItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}

function addItem(name, imageUrl, weather) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function likeItem(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  });
}

function unlikeItem(itemId) {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}

function updateUser(name, avatar) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, avatar }),
  });
}

export {
  baseUrl,
  getItems,
  removeItems,
  addItem,
  request,
  likeItem,
  unlikeItem,
  updateUser,
  BASE_HEADERS,
  getAuthHeaders,
};
