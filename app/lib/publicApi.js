import { http } from "./http";

export const publicApi = {
  login: (data) =>
    http("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data) =>
    http("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProducts: () => http("/products"),
  getProduct: (id) => http(`/products/${id}`),
    // 🔥 NEW: get products by category
  getProductsByCategory: (category) =>  http(`/products/category/${category}`), 
  getCart: () => http("/cart"),
  // Add to cart
  addCart: (productId, qty = 1) =>
    http("/cart/add", {

      method: "POST",
      body: JSON.stringify({ productId, qty }),
    }),

  // Remove item from cart
  removeCart: (productId) =>
    http("/cart/remove", {
      method: "POST",
      body: JSON.stringify({ productId }),
    }),

  // Clear full cart
  clearCart: () =>
    http("/cart/clear", {
      method: "POST",
    }),

    updateCart: (productId, qty) =>
  http("/cart/update", {
    method: "PUT",
    body: JSON.stringify({ productId, qty }),
  }),

  //order
  placeOrder: (data) => http("/orders",
     {
      method: "POST",
      body: JSON.stringify({ data }),
    }),
};