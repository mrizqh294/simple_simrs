import { useEffect, useState } from "react";

import { getPatients } from "./../services/patientServices";

export const usePatient = ({ page = 1, limit = 10, search = "" }) => {
  const [patients, setPatients] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPatient = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPatients({ page, limit, search });

      setPatients(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatient();
  }, [page, limit, search]);

  return {
    patients,
    totalPages,
    loading,
    error,
    refetchPatient: loadPatient,
  };
};
