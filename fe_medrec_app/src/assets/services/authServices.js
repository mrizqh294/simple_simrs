import { fetchApi } from "./api";

export const loginUser = async (credentials) => {
  return await fetchApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const logoutUser = async () => {
  return await fetchApi("/auth/logout", {
    method: "POST",
  });
};

export const getCurrentUser = async () => {
  return await fetchApi("/auth/me", {
    method: "GET",
  });
};
