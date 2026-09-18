import { useEffect, useState } from "react";
import { getDoctors } from "./../services/doctorServices";


export const useDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctor= async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getDoctors();

      setDoctors(result.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctor();
  }, []);

  return {
    doctors,
    loading,
    error,
    refetch: loadDoctor,
  };
};
