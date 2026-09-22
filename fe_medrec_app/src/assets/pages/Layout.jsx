import { Outlet } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";

const MENUS = {
  ADMIN: [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/registration", label: "Registrasi" },
    { link: "/user", label: "Manajemen User" },
    { link: "/queue", label: "Antrean" },
    { link: "/patient", label: "Pasien" },
    { link: "/visit", label: "Kunjungan" },
    { link: "/medical-record", label: "Rekam Medis" },
  ],

  PENDAFTARAN: [
    { link: "/registration", label: "Registrasi" },
  ],

  DOKTER: [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/queue", label: "Antrean" },
    { link: "/visit", label: "Kunjungan" },
    { link: "/medical-record", label: "Rekam Medis" },
  ],

  PERAWAT: [
    { link: "/nurse/queue", label: "Antrean" },
  ],
};

const AppLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = MENUS[user?.role] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} />

      <main className="ml-64 min-h-screen bg-gray-50">
        <Header />

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;