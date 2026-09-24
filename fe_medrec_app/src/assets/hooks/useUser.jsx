import { useEffect, useState } from "react";
import { getUsers } from "./../services/userServices";

export const useUser = ({ page = 1, limit = 10, search = "", filter = "" }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getUsers({
        page,
        limit,
        search,
        filter,
      });

      setUsers(result.data);
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
    loadUsers();
  }, [page, limit, search, filter]);

  return {
    users,
    stats,
    totalPages,
    loading,
    error,
    refetch: loadUsers,
  };
};
