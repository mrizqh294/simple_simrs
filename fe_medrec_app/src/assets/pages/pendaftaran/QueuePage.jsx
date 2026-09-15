import { useState, useEffect } from "react";
import { Table, Th, Td, EmptyRow } from "../../components/Table";
import {
  getQueues,
  callQueue,
  updateQueueStatus,
} from "../../services/queueServices";

const QueuePage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [queues, setQueues] = useState([]);

  const fetchQueues = async () => {
    try {
      const result = await getQueues();
      setQueues(result.data || result);
    } catch (error) {
      console.error("Gagal memuat data pasien:", error.message);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

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

  const handleCall = async (id) => {
    try {
      const result = await callQueue(id);

      if (!result.success) {
        alert(result.message || "Gagal memanggil antrean");
        return;
      }

      setQueues((prev) =>
        prev.map((queue) =>
          queue.id === id
            ? {
                ...queue,
                status: "DIPANGGIL",
              }
            : queue,
        ),
      );
    } catch (error) {
      console.error("Gagal memanggil antrean:", error.message);

      alert(error.message || "Terjadi kesalahan saat memanggil antrean");
    }
  };

  const handleSkip = async (id) => {
    try {
      const result = await updateQueueStatus(id, {
        status: "DILEWATI",
      });

      if (!result.success) {
        alert(result.message || "Gagal melewati antrean");
        return;
      }

      setQueues((prev) =>
        prev.map((queue) =>
          queue.id === id
            ? {
                ...queue,
                status: "DILEWATI",
              }
            : queue,
        ),
      );
    } catch (error) {
      console.error("Gagal melewati antrean:", error.message);

      alert(error.message || "Terjadi kesalahan saat melewati antrean");
    }
  };

  const handleCancel = async (id) => {
    try {
      const result = await updateQueueStatus(id, {
        status: "BATAL",
      });

      if (!result.success) {
        alert(result.message || "Gagal membatalkan antrean");
        return;
      }

      setQueues((prev) =>
        prev.map((queue) =>
          queue.id === id
            ? {
                ...queue,
                status: "BATAL",
              }
            : queue,
        ),
      );
    } catch (error) {
      console.error("Gagal melewati antrean:", error.message);
      alert(error.message || "Terjadi kesalahan saat membatalkan antrean");
    }
  };

  const filteredQueues = queues.filter((queue) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      queue.queueNumber.toLowerCase().includes(keyword) ||
      queue.visit.patient.name.toLowerCase().includes(keyword) ||
      queue.visit.patient.recordNumber.toLowerCase().includes(keyword) ||
      queue.visit.poli.name.toLowerCase().includes(keyword) ||
      queue.visit.doctor.name.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" || queue.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
            {queues.length}
          </p>

          <p className="mt-1 text-xs text-gray-400">Antrean hari ini</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Menunggu</p>

          <p className="mt-2 text-2xl font-semibold text-yellow-600">
            {queues.filter((queue) => queue.status === "MENUNGGU").length}
          </p>

          <p className="mt-1 text-xs text-gray-400">Belum dipanggil</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Dipanggil</p>

          <p className="mt-2 text-2xl font-semibold text-green-600">
            {queues.filter((queue) => queue.status === "DIPANGGIL").length}
          </p>

          <p className="mt-1 text-xs text-gray-400">Sedang dipanggil</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Selesai</p>

          <p className="mt-2 text-2xl font-semibold text-blue-600">
            {queues.filter((queue) => queue.status === "SELESAI").length}
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
              <option value="ALL">Semua Status</option>
              <option value="MENUNGGU">Menunggu</option>
              <option value="DIPANGGIL">Dipanggil</option>
              <option value="DILEWATI">Dilewati</option>
              <option value="BATAL">Dibatalkan</option>
              <option value="SELESAI">Selesai</option>
            </select>
          </div>
        </div>

        {/* TABLE */}

        <Table>
          <thead>
            <tr>
              <Th>Antrian</Th>
              <Th>Nama</Th>
              <Th>No. Rekam Medis</Th>
              <Th>Poli</Th>
              <Th>Dokter</Th>
              <Th>Status</Th>
              <Th className="text-center">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredQueues.length > 0 ? (
              filteredQueues.map((queue) => (
                <tr key={queue.id}>
                  <Td>{queue.queueNumber}</Td>
                  <Td>{queue.visit.patient.name}</Td>
                  <Td>{queue.visit.patient.recordNumber}</Td>
                  <Td>{queue.visit.poli.name}</Td>
                  <Td>{queue.visit.doctor.name}</Td>
                  <Td>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                        queue.status,
                      )}`}
                    >
                      {getStatusLabel(queue.status)}
                    </span>
                  </Td>
                  <Td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={queue.status !== "MENUNGGU"}
                        onClick={() => handleCall(queue.id)}
                        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                      >
                        Panggil
                      </button>

                      <button
                        type="button"
                        disabled={queue.status !== "MENUNGGU"}
                        onClick={() => handleSkip(queue.id)}
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                      >
                        Lewati
                      </button>

                      <button
                        type="button"
                        disabled={queue.status !== "MENUNGGU"}
                        onClick={() => handleCancel(queue.id)}
                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </Td>
                </tr>
              ))
            ) : (
              <EmptyRow colSpan={7} />
            )}
          </tbody>
        </Table>

        {/* FOOTER */}
        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400">
            Menampilkan {filteredQueues.length} dari {queues.length} antrean
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueuePage;
