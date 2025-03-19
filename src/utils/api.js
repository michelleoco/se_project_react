const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items `).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function removeItems(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

function addItem(name, imageUrl, weather) {
  console.log(name, imageUrl, weather);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

export { getItems, removeItems, addItem };
