import { http } from "./http";

const BASE = process.env.NEXT_PUBLIC_API_BASE;

export const adminApi = {
  /* ===================== USERS GROUP ====================== */
  users: {
  getAll: () => http("/admin/getuser", { method: "GET" }),

    

    create: (data) =>
      http("/admin/users/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    delete: (id) =>
      http(`/admin/users/${id}`, {
        method: "DELETE",
      }),

    update: (id, data) =>
      http(`/admin/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  /* ===================== PRODUCTS GROUP ====================== */
  products: {
    getAll: () => http("/admin/getproduct"),

    create: async (data) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);

      data.images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await fetch(`${BASE}/api/admin/createproduct`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
        body: formData,
      });

      return res.json();
    },

    delete: (id) =>
      http(`/admin/products/${id}`, {
        method: "DELETE",
      }),

    update: (id, data) =>
      http(`/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  /* ===================== ORDERS GROUP ====================== */
  orders: {
    getAll: () => http(`/admin/orders`),

    getById: (id) => http(`/admin/orders/${id}`),

    create: (data) =>
      http(`/admin/createorder`, {
        method: "POST",
        body: JSON.stringify(data),
      }),

    update: (id, data) =>
      http(`/admin/orders/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },
};
