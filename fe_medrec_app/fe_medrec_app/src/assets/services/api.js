const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchApi = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = res.headers.get("content-type");

  const data = contentType?.includes("application/json")
    ? await res.json()
    : null;

  if (!res.ok) {
    throw new Error(
      data?.message || `Request gagal dengan status ${res.status}`
    );
  }

  if (res.status === 204) {
    return null;
  }

  return data;
};
