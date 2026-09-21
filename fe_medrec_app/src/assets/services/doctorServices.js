import { fetchApi } from "./api";

export const getDoctors = async (poliId) => {
  const params = new URLSearchParams({
    poliId: poliId,
  });
  
  return await fetchApi(`/doctors?${params.toString()}`, {
    method: "GET",
  });
};