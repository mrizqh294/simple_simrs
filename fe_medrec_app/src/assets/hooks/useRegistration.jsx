import { useEffect, useState } from "react";

import { getPatients } from "./../services/patientServices";
import { getDoctors } from "./../services/doctorServices";
import { getPoli } from "./../services/poliServices";

export const useRegistration = ({ page = 1, limit = 10, search = "" }) => {
  const [data, setData] = useState({
    patients: [],
    doctors: [],
    polies: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRegistration = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit,
        search,
      };

      const [patientsResult, doctorsResult, poliResult] = await Promise.all([
        getPatients(params),
        getDoctors(),
        getPoli(),
      ]);

      setData({
        patients: patientsResult.data,
        doctors: doctorsResult.data,
        polies: poliResult.data,
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistration();
  }, [page, limit, search]);

  return {
    ...data,
    loading,
    error,
    refetch: loadRegistration,
  };
};
