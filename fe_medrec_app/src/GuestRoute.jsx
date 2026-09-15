import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await getCurrentUser();

        if (result?.success) {
          setUser(result.user);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/registration" replace />;
  }

  return (
    <div>
      Login
    </div>
  );
};

export default Login;