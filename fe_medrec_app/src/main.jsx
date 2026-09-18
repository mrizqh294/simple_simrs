import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegistrationLayout from "./assets/pages/registration/RegistrationLayout";
import Login from "./assets/pages/LoginPage";
import Registration from "./assets/pages/registration/RegistrationPage";
import Queue from "./assets/pages/registration/QueuePage";
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
