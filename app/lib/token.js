export const getToken = () => {
  if (typeof window === "undefined") return null;

  const path = window.location.pathname;

  if (path.startsWith("/admin")) {
    return sessionStorage.getItem("adminToken");
  }
  if (path.startsWith("/merchant")) {
    return sessionStorage.getItem("merchantToken");
  }
  if (path.startsWith("/reseller")) {
    return sessionStorage.getItem("resellerToken");
  }

  return localStorage.getItem("accessToken"); // default
};
