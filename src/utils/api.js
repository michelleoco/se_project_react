const baseUrl = "http://localhost:3001";
const getToken = () => {
  return localStorage.getItem("jwt");
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
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function removeItems(id) {
  const token = getToken();
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function addItem(name, imageUrl, weather) {
  const token = getToken();
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function likeItem(itemId) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function unlikeItem(itemId) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function updateUser(name, avatar) {
  const token = getToken();
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
}

export {
  getItems,
  removeItems,
  addItem,
  request,
  likeItem,
  unlikeItem,
  updateUser,
};
