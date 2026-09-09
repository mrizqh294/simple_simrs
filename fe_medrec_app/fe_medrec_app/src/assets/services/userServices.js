import { fetchApi } from "./api";

export const getDoctors = async () => {
  return await fetchApi("/users?role=DOKTER", {
    method: "GET",
  });
};