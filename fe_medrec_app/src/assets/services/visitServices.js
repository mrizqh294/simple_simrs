import { fetchApi } from "./api";

export const getVisits = async ({ page = 1, limit = 10 }) => {
  const params = new URLSearchParams({
    page,
    limit,
  });
  
  return await fetchApi(`/visits?${params.toString()}`, {
    method: "GET",
  });
};
export const createVisit = async (visitData) => {
  return await fetchApi("/visits", {
    method: "POST",
    body: JSON.stringify(visitData),
  });
};

export const updateVisitStatus = async (id, statusData) => {
  return await fetchApi(`/visits/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(statusData),
  });
};
