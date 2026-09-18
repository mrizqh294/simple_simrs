import { useEffect, useState } from "react";
import { getPoli } from "./../services/poliServices";


export const usePoli = () => {
  const [polies, setPolies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPoli= async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPoli();

      setPolies(result.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoli();
  }, []);

  return {
    polies,
    loading,
    error,
    refetch: loadPoli,
  };
};