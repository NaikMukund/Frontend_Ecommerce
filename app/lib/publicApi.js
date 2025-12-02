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
  getCart: () => http("/cart"),
};
