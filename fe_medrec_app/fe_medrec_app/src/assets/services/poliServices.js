import { fetchApi } from "./api";

export const getPoli = async () => {
  return await fetchApi("/poli", {
    method: "GET",
  });
};