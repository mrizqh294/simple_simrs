import { fetchApi } from "./api";

export const createMedicalRecord = async (recordData) => {
  console.log(recordData);
  return await fetchApi("/medical-records", {
    method: "POST",
    body: JSON.stringify(recordData),
  });
};

export const getMedicalRecords = async (
  { page = 1, limit = 10, search = "" },
  patientId,
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
  });

  if (patientId) {
    params.append("patientId", patientId);
  }

  return await fetchApi(`/medical-records?${params.toString()}`, {
    method: "GET",
  });
};
