import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RegistrationLayout from "./assets/pages/pendaftaran/RegistrationLayout";

import Login from "./assets/pages/LoginPage";
import Dashboard from "./assets/pages/pendaftaran/DashboardPage";
import Registration from "./assets/pages/pendaftaran/RegistrationPage";
import Queue from "./assets/pages/pendaftaran/QueuePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <RegistrationLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
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
  {
    path: "*",
    element: <div>Halaman Tidak Ditemukan (404)</div>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
