import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = localStorage.getItem("user");

  if (user) {
    const userData = JSON.parse(user);

    if (userData.role === "PENDAFTARAN") {
      return <Navigate to="/registration" replace />;
    }

    if (userData.role === "DOKTER") {
      return <Navigate to="/doctor/visits" replace />;
    }

    if (userData.role === "PERAWAT") {
      return <Navigate to="/nurse/queues" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
