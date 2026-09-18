import { fetchApi } from "./api";

export const getDoctors = async () => {
  return await fetchApi("/doctor", {
    method: "GET",
  });
};