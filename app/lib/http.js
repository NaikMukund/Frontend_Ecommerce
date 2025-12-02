import { getToken } from "./token";
import { buildURL } from "./url";

export async function http(path, options = {}) {
  const token = getToken();

  const url = buildURL(path); // env-based URL

  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
    body: options.body || null,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "API Error");
  }

  return res.json();
}
