import { useEffect, useState } from "react";

import { getMedicalRecords } from "./../services/medicalRecordServices";

export const useMedicalRecord = ({
  page = 1,
  limit = 10,
  search = "",
  patientId,
}) => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMedicalRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getMedicalRecords(
        { page, limit, search },
        patientId,
      );

      setMedicalRecords(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicalRecords();
  }, [page, limit, search, patientId]);

  return {
    medicalRecords,
    totalPages,
    loading,
    error,
    refetchMedicalRecords: loadMedicalRecords,
  };
};