import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationLayout from "./assets/pages/pendaftaran/RegistrationLayout";
import Login from "./assets/pages/LoginPage";
import Registration from "./assets/pages/pendaftaran/RegistrationPage";
import Queue from "./assets/pages/pendaftaran/QueuePage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RegistrationLayout />,
        children: [
          {
            path: "/registration",
            element: <Registration />,
          },
          {
            path: "/queue",
            element: <Queue />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <div>Halaman Tidak Ditemukan (404)</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
