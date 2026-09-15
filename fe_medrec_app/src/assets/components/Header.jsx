import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authServices";

export default function Header() {
  const [user, setUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const result = await getCurrentUser();

      setUser(result.user || result.data || result);
    } catch (error) {
      console.error("Gagal memuat data user:", error.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const getRoleName = (role) => {
    const roles = {
      ADMIN: "Administrator",
      PENDAFTARAN: "Petugas Pendaftaran",
      DOKTER: "Dokter",
    };

    return roles[role] || role;
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-5 sm:px-8">
      <div>
        <p className="text-sm text-gray-400">Selamat datang,</p>

        <h2 className="text-lg font-semibold text-gray-900">
          {user?.name || "Memuat..."}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-700">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="text-xs text-gray-400">
            {getRoleName(user?.role)}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
          {getInitials(user?.name)}
        </div>
      </div>
    </header>
  );
}
