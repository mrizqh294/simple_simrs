import { fetchApi } from "./api";

export const createQueue = async (queueData) => {
  return await fetchApi("/queues", {
    method: "POST",
    body: JSON.stringify(queueData),
  });
};

export const getQueues = async ({ page = 1, limit = 10, search = "" }) => {
  const params = new URLSearchParams({
    page,
    limit,
    search,
  });

  return await fetchApi(`/queues?${params.toString()}`, {
    method: "GET",
  });
};

export const callQueue = async (id) => {
  return await fetchApi(`/queues/${id}/call`, {
    method: "PATCH",
  });
};

export const updateQueueStatus = async (id, statusData) => {
  return await fetchApi(`/queues/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(statusData),
  });
};
