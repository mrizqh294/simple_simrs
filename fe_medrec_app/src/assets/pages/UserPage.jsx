import { useState } from "react";
import { createUser, updateUser, deleteUser } from "../services/userServices";
import { useUser } from "../hooks/useUser";
import Pagination from "../components/Pagination";
import UserTable from "../components/table/UserTable";
import UserModal from "../components/modal/UserModal";
import { usePoli } from "../hooks/usePoli";

const UserPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const [formData, setFormData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const LIMIT = 10;

  const { polies } = usePoli();

  const {
    users,
    totalPages,
    refetch: refetchUsers,
  } = useUser({
    page,
    limit: LIMIT,
    search,
    filter,
  });

  const openCreateModal = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
    });

    setActiveModal("create");
  };

  const openEditModal = (user) => {
    setSelectedUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });

    setActiveModal("edit");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedUser(null);
    setFormData({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let result;

      switch (activeModal) {
        case "create":
          result = await createUser({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          });
          break;

        case "edit":
          result = await updateUser(selectedUser.id, {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          });
          break;

        default:
          return;
      }

      if (!result?.success) {
        alert(result?.message || "Proses gagal");
        return;
      }

      alert(result.message || "Proses berhasil");

      await refetchUsers();

      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan pada server");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteUser(id);

      if (!result?.success) {
        alert(result?.message || "Gagal menghapus user");
        return;
      }

      alert(result.message || "User berhasil dihapus");

      await refetchUsers();
    } catch (error) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan pada server");
    }
  };

  return (
    <>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Manajemen User
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola data pengguna dan hak akses sistem.
          </p>
        </div>

        {/* USER TABLE CARD */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Daftar User
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Cari user berdasarkan nama atau email.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* SEARCH */}
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Cari user..."
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-64"
              />

              {/* FILTER ROLE */}
              <select
                value={filter}
                onChange={handleFilterChange}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">Semua Role</option>
                <option value="ADMIN">Admin</option>
                <option value="DOKTER">Dokter</option>
                <option value="PERAWAT">Perawat</option>
                <option value="PENDAFTARAN">Pendaftaran</option>
              </select>

              {/* ADD USER */}
              <button
                type="button"
                onClick={openCreateModal}
                className="cursor-pointer rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Tambah User
              </button>
            </div>
          </div>

          {/* TABLE */}
          <UserTable
            users={users}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
          />

          {/* TABLE FOOTER */}
          <div className="border-t border-gray-100 px-5 py-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* USER MODAL */}
      <UserModal
        show={activeModal === "create" || activeModal === "edit"}
        mode={activeModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        polies={polies}
      />
    </>
  );
};

export default UserPage;
