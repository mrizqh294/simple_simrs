import { fetchApi } from "./api";

export const registerPatient = async (patientData) => {
  return await fetchApi("/registration", {
    method: "POST",
    body: JSON.stringify(patientData),
  });
};

export const getVisits = async () => {
  return await fetchApi("/registration", {
    method: "GET",
  });
};

export const updateVisit = async (id, updatedData) => {
  return await fetchApi(`/registration/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
};
