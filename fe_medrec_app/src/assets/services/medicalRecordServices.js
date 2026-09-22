import { fetchApi } from "./api";

export const createMedicalRecord = async (recordData) => {
  console.log(recordData);
  return await fetchApi("/medical-records", {
    method: "POST",
    body: JSON.stringify(recordData),
  });
};

export const getMedicalRecords = async () => {
  return await fetchApi("/medical-records", {
    method: "GET",
  });
};
