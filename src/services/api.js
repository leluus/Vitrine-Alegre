const BASE_URL = "https://dummyjson.com";

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function buildQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });
  return searchParams.toString();
}

export async function getProducts({ limit = 12, skip = 0, sortBy, order } = {}) {
  const query = buildQuery({ limit, skip, sortBy, order });
  const response = await fetch(`${BASE_URL}/products?${query}`);
  return handleResponse(response);
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return handleResponse(response);
}

export async function searchProducts(query, { limit = 12, skip = 0, sortBy, order } = {}) {
  const params = buildQuery({ q: query, limit, skip, sortBy, order });
  const response = await fetch(`${BASE_URL}/products/search?${params}`);
  return handleResponse(response);
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return handleResponse(response);
}

export async function getProductsByCategory(category, { limit = 12, skip = 0, sortBy, order } = {}) {
  const query = buildQuery({ limit, skip, sortBy, order });
  const response = await fetch(`${BASE_URL}/products/category/${category}?${query}`);
  return handleResponse(response);
}