import { useEffect, useState } from "react";
import { getDoctors } from "./../services/doctorServices";


export const useDoctor = (poliId) => {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctor= async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getDoctors(poliId);

      setDoctors(result.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!poliId) {
      setDoctors([]);
      return;
    }

    loadDoctor();
  }, [poliId]);

  return {
    doctors,
    loading,
    error
  };
};
