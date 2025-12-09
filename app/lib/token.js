export const getToken = () => {
  if (typeof window === "undefined") return null;

  const path = window.location.pathname;

  if (path.startsWith("/admin")) {
    return sessionStorage.getItem("adminToken"); 
  }

  return localStorage.getItem("accessToken");
};
