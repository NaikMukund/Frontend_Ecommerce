import { getToken } from "./token";
import { buildURL } from "./url";

export async function http(path, options = {}) {
  const token = getToken();
  const url = buildURL(path);
console.log("FETCHING URL 👉", url);
  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      ...(options.headers || {}),
      "Content-Type": options.body instanceof FormData ? undefined : "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: options.body || null,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "API Error");
  }

  return res.json();
}
