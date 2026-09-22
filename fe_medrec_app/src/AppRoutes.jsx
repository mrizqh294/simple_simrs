import { createBrowserRouter } from "react-router-dom";
import Login from "./assets/pages/LoginPage";
import Registration from "./assets/pages/RegistrationPage";
import QueuePage from "./assets/pages/QueuePage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "./assets/pages/Layout";
import Unauthorized from "./assets/pages/UnauthorizedPage";
import VisitPage from "./assets/pages/VisitPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    element: <ProtectedRoute allowedRoles={["PENDAFTARAN"]} />,
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
    element: <ProtectedRoute allowedRoles={["PERAWAT"]} />,
    children: [
      {
        path:"/nurse/",
        element: <AppLayout />,
        children: [
          {
            path: "queue",
            element: <QueuePage />,
          },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["DOKTER"]} />,
    children: [
      {
        path:"/doctor/",
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
    path: "/unauthorized",
    element: <Unauthorized />
  }
]);
