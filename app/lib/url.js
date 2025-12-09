const BASE = process.env.NEXT_PUBLIC_API_BASE ;
const PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "/api";

// Clean URL builder
export const buildURL = (path) => {
  // If full URL provided, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Join BASE + PREFIX + path safely
  const finalURL = `${BASE}${PREFIX}${path}`;

  // Remove extra slashes EXCEPT after "http://" or "https://"
  return finalURL.replace(/(?<!:)\/+/g, "/");
};
