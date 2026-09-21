import { useState } from "react";
import { updateQueueStatus } from "../../services/queueServices";
import { useQueue } from "../../hooks/useQueue";
import Pagination from "../../components/Pagination";
import QueueTable from "../../components/registration/QueueTable";

const QueuePage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const LIMIT = 10;

  const { queues, stats, totalPages, refetch } = useQueue({
    page,
    limit: LIMIT,
    search,
    filter : statusFilter,
  });

  const getStatusLabel = (status) => {
    const statusMap = {
      MENUNGGU: "Menunggu",
      DIPANGGIL: "Dipanggil",
      DILEWATI: "Dilewati",
      BATAL: "Dibatalkan",
      SELESAI: "Selesai",
    };

    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const statusMap = {
      MENUNGGU: "bg-yellow-50 text-yellow-700",
      DIPANGGIL: "bg-green-50 text-green-700",
      DILEWATI: "bg-gray-100 text-gray-600",
      BATAL: "bg-red-50 text-red-600",
      SELESAI: "bg-blue-50 text-blue-700",
    };

    return statusMap[status] || "bg-gray-100 text-gray-600";
  };

  const handleStatus = async (id, status) => {
    try {
      const result = await updateQueueStatus(id, {
        status: status,
      });

      if (!result.success) {
        alert(result.message || "Gagal mengubah status");
        return;
      }

      refetch();
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat mengubah");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Antrean Pasien</h1>

        <p className="mt-1 text-sm text-gray-500">
          Kelola antrean pasien untuk pemeriksaan hari ini.
        </p>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Antrean</p>

          <p className="mt-2 text-2xl font-semibold text-gray-800">
            {stats.totalQueues}
          </p>

          <p className="mt-1 text-xs text-gray-400">Antrean hari ini</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Menunggu</p>

          <p className="mt-2 text-2xl font-semibold text-yellow-600">
            {stats.totalWaiting}
          </p>

          <p className="mt-1 text-xs text-gray-400">Belum dipanggil</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Dipanggil</p>

          <p className="mt-2 text-2xl font-semibold text-green-600">
            {stats.totalCalled}
          </p>

          <p className="mt-1 text-xs text-gray-400">Sedang dipanggil</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Selesai</p>

          <p className="mt-2 text-2xl font-semibold text-blue-600">
            {stats.totalCompleted}
          </p>

          <p className="mt-1 text-xs text-gray-400">Pemeriksaan selesai</p>
        </div>
      </div>

      {/* QUEUE TABLE */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* TABLE HEADER */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              Antrean Hari Ini
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Daftar antrean pasien berdasarkan urutan pendaftaran.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* SEARCH */}
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari antrean atau pasien..."
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-72"
            />

            {/* FILTER */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="">Semua Status</option>
              <option value="MENUNGGU">Menunggu</option>
              <option value="DIPANGGIL">Dipanggil</option>
              <option value="DILEWATI">Dilewati</option>
              <option value="BATAL">Dibatalkan</option>
              <option value="SELESAI">Selesai</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <QueueTable
          queues={queues}
          handleStatus={handleStatus}
          getStatusClass={getStatusClass}
          getStatusLabel={getStatusLabel}
        />

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-5 py-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default QueuePage;
