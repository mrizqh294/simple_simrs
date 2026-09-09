import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const RegistrationLayout = () => {

  const PENDAFTARAN_MENUS = [
    { link: "/dashboard", label: "Dashboard" },
    { link: "/registration", label: "Registrasi" },
    { link: "/queue", label: "Antrean" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        menuItems={PENDAFTARAN_MENUS}
      />
      <main className="ml-64 min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
        <div className="p-6 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RegistrationLayout;
