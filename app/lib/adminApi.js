import { http } from "./http";

export const adminApi = {
  // FETCH USERS
  getUsers: () => http("/admin/getuser"),

  // FETCH PRODUCTS
  getProducts: () => http("/admin/getproduct"),
  



  // CREATE PRODUCT
  createProduct: (data) =>
    http("/admin/product/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // DELETE PRODUCT
  deleteProduct: (id) =>
    http(`/admin/products/${id}`, {
      method: "DELETE",
    }),

  // UPDATE PRODUCT
  updateProduct: (id, data) =>
    http(`/admin/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
    createUser: (data) =>
  http("/admin/users/create", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  //crete user
  createUser: (data) =>
  http("/admin/users/create", {
    method: "POST",
    body: JSON.stringify(data),
  }),


  // DELETE USER
  deleteUser: (id) =>
    http(`/admin/users/${id}`, {
      method: "DELETE",
    }),

  // UPDATE USER
  updateUser: (id, data) =>
    http(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
