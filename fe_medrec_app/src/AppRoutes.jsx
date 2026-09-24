import { createBrowserRouter } from "react-router-dom";
import Login from "./assets/pages/LoginPage";
import Registration from "./assets/pages/RegistrationPage";
import QueuePage from "./assets/pages/QueuePage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./assets/pages/Layout";
import Unauthorized from "./assets/pages/UnauthorizedPage";
import VisitPage from "./assets/pages/VisitPage";
import MedicalRecordPage from "./assets/pages/MedicalRecordPage";
import PublicRoute from "./PublicRoute";
import UserPage from "./assets/pages/UserPage";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["PENDAFTARAN", "ADMIN"]} />,
    children: [
      {
        element: <AppLayout />,

        children: [
          {
            path: "registration",
            element: <Registration />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["PERAWAT", "ADMIN"]} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "queues",
            element: <QueuePage />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["DOKTER", "ADMIN", "PENDAFTARAN"]} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "visits",
            element: <VisitPage />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["DOKTER"]} />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "medical-records",
            element: <MedicalRecordPage />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <AppLayout />,

        children: [
          {
            path: "users",
            element: <UserPage />,
          },
        ],
      },
    ],
  },

  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
