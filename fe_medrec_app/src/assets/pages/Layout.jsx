import { Outlet } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import Header from "./../components/Header";

const MENUS = {
  ADMIN: [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/users", label: "Manajemen User" },
    { link: "/registration", label: "Pasien" },
    { link: "/queues", label: "Antrean" },
    { link: "/visits", label: "Kunjungan" },
  ],

  PENDAFTARAN: [
    { link: "/registration", label: "Registrasi" },
    { link: "/visits", label: "Riwayat Kunjungan" },
  ],

  DOKTER: [
    { link: "/visits", label: "Kunjungan" },
    { link: "/medical-records", label: "Rekam Medis" },
  ],

  PERAWAT: [
    { link: "/queues", label: "Antrean" },
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