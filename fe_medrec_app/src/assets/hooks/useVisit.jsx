import { useEffect, useState } from "react";

import { getVisits } from "./../services/visitServices";

export const useVisit = ({ page = 1, limit = 10 }) => {
  const [visits, setVisits] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVisit = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getVisits({ page, limit });

      setVisits(result.data);
      setTotalPages(result.pagination.totalPages);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisit();
  }, [page, limit]);

  return {
    visits,
    totalPages,
    loading,
    error,
    refetchVisit: loadVisit,
  };
};