import { http } from "./http";

export const publicApi = {
  /* ===================== AUTH ===================== */
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

  /* ===================== PRODUCTS ===================== */
  searchProducts: (query) =>
    http(`/products?q=${query}`),

  getProducts: () =>
    http("/products"),

  getProduct: (id) =>
    http(`/products/${id}`),

  // Get products by category
  getProductsByCategory: (category) =>
    http(`/products/category/${category}`),

  /* ===================== CART ===================== */
  getCart: () =>
    http("/cart"),

  addCart: (productId, qty = 1) =>
    http("/cart/add", {
      method: "POST",
      body: JSON.stringify({ productId, qty }),
    }),

  updateCart: (productId, qty) =>
    http("/cart/update", {
      method: "PUT",
      body: JSON.stringify({ productId, qty }),
    }),

  removeCart: (productId) =>
    http("/cart/remove", {
      method: "POST",
      body: JSON.stringify({ productId }),
    }),

  clearCart: () =>
    http("/cart/clear", {
      method: "POST",
    }),

  /* ===================== ORDERS ===================== */
  placeOrder: (data) =>
    http("/orders", {
      method: "POST",
      body: JSON.stringify({ data }),
    }),

  getUserOrders: () =>
    http("/orders"),

  getOrderById: (id) =>
    http(`/orders/${id}`),


    getWallet: () =>
    http("/wallet"),

  addMoneyToWallet: (amount) =>
    http("/wallet/add", {
      method: "POST",
      body: JSON.stringify({ amount }),
    }),

  getWalletTransactions: () =>
    http("/wallet/transactions")
};



