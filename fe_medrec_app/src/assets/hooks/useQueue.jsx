import { useEffect, useState } from "react";
import { getQueues } from "./../services/queueServices";

export const useQueue = ({ page = 1, limit = 10, search = "" , filter=""}) => {
  const [queues, setQueues] = useState([]);
  const [stats, setStats] = useState({});
  const [totalPages, setTotalPages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQueues = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getQueues({ page, limit, search, filter });

      setQueues(result.data);
      setStats(result.stat);
      setTotalPages(result.pagination?.totalPages);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueues();
  }, [page, limit, search, filter]);

  return {
    queues,
    stats,
    totalPages,
    loading,
    error,
    refetch: loadQueues,
  };
};
