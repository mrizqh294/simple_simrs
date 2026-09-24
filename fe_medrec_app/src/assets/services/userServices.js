import { fetchApi } from "./api";

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  filter = "",
}) => {
  const params = new URLSearchParams({
    page,
    limit,
    search,
    filter,
  });

  return await fetchApi(`/users?${params.toString()}`, {
    method: "GET",
  });
};

export const createUser = async (userData) => {
  return await fetchApi("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const updateUser = async (userData) => {
  return await fetchApi("/users", {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (id) => {
  return await fetchApi(`/users/${id}`, {
    method: "DELETE",
  });
};
