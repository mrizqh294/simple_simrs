import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./assets/services/authServices";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await getCurrentUser();

        console.log("CURRENT USER:", result);

        if (result?.success) {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Gagal mengecek user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "ADMIN" && user.role !== "PENDAFTARAN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;