import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authServices";

export default function Sidebar({ menuItems }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (!confirmLogout) return;
    try {
      const result = await logoutUser();
      if (!result.success) {
        alert(result.message || "Gagal logout");
        return;
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Terjadi kesalahan saat logout");
    }
  };

  return (
    <aside className="fixed hidden left-0 top-0 z-40 h-screen w-64 shrink-0 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-lg font-bold text-white">
          MR
        </div>

        <div>
          <h1 className="font-bold text-gray-900">MRCare</h1>
          <p className="text-xs text-gray-400">SIMRS</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>

        <nav className="space-y-1">
          {menuItems.map((menu) => (
            <NavLink
              key={menu.id || menu.link} // Gunakan link sebagai fallback key jika id tidak ada
              to={menu.link}
              // NavLink menyediakan parameter 'isActive' di dalam className
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                  isActive
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              <span>{menu.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-100 p-4">
        <div
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 cursor-pointer hover:bg-gray-100 transition"
        >
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
            LOGOUT
          </div> */}

          <div className="min-w-0">
            <p className="text-gray-500 hover:text-gray-800">Logout</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
