import { fetchApi } from "./api";

export const getPatients = async () => {
  return await fetchApi("/patients", {
    method: "GET",
  });
};

export const createPatient = async (patientData) => {
  return await fetchApi("/patients", {
    method: "POST",
    body: JSON.stringify(patientData),
  });
};

export const getPatientById = async (id) => {
  return await fetchApi(`/patients/${id}`, {
    method: "GET",
  });
};

export const updatePatient = async (id, updatedData) => {
  return await fetchApi(`/patients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
  });
};

export const deletePatient = async (id) => {
  return await fetchApi(`/patients/${id}`, {
    method: "DELETE",
  });
};
