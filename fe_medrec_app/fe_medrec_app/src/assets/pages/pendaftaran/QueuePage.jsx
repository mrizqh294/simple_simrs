import { useState } from "react";
import { Table, Th, Td, EmptyRow } from "../../components/Table";

const QueuePage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [queues, setQueues] = useState([
    {
      id: 1,
      queueNumber: "A001",
      patientName: "Muhammad Rizki",
      recordNumber: "RM-20260001",
      poli: "Poli Umum",
      doctor: "Dr. Budi",
      registrationTime: "08:01",
      status: "WAITING",
    },
    {
      id: 2,
      queueNumber: "A002",
      patientName: "Siti Aminah",
      recordNumber: "RM-20260002",
      poli: "Poli Gigi",
      doctor: "Dr. Andi",
      registrationTime: "08:05",
      status: "WAITING",
    },
    {
      id: 3,
      queueNumber: "A003",
      patientName: "Andi Setiawan",
      recordNumber: "RM-20260003",
      poli: "Poli Umum",
      doctor: "Dr. Budi",
      registrationTime: "08:12",
      status: "CALLED",
    },
    {
      id: 4,
      queueNumber: "A004",
      patientName: "Dewi Lestari",
      recordNumber: "RM-20260004",
      poli: "Poli Anak",
      doctor: "Dr. Siti",
      registrationTime: "08:17",
      status: "WAITING",
    },
    {
      id: 5,
      queueNumber: "A005",
      patientName: "Rudi Hermawan",
      recordNumber: "RM-20260005",
      poli: "Poli Umum",
      doctor: "Dr. Budi",
      registrationTime: "08:23",
      status: "SKIPPED",
    },
    {
      id: 6,
      queueNumber: "A006",
      patientName: "Nina Permata",
      recordNumber: "RM-20260006",
      poli: "Poli Gigi",
      doctor: "Dr. Andi",
      registrationTime: "08:29",
      status: "CANCELED",
    },
  ]);

  const getStatusLabel = (status) => {
    const statusMap = {
      WAITING: "Menunggu",
      CALLED: "Dipanggil",
      SKIPPED: "Dilewati",
      CANCELED: "Dibatalkan",
      COMPLETED: "Selesai",
    };

    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const statusMap = {
      WAITING: "bg-yellow-50 text-yellow-700",
      CALLED: "bg-green-50 text-green-700",
      SKIPPED: "bg-gray-100 text-gray-600",
      CANCELED: "bg-red-50 text-red-600",
      COMPLETED: "bg-blue-50 text-blue-700",
    };

    return statusMap[status] || "bg-gray-100 text-gray-600";
  };

  const handleCall = (id) => {
    setQueues((prev) =>
      prev.map((queue) =>
        queue.id === id
          ? {
              ...queue,
              status: "CALLED",
            }
          : queue,
      ),
    );
  };

  const handleSkip = (id) => {
    setQueues((prev) =>
      prev.map((queue) =>
        queue.id === id
          ? {
              ...queue,
              status: "SKIPPED",
            }
          : queue,
      ),
    );
  };

  const handleCancel = (id) => {
    setQueues((prev) =>
      prev.map((queue) =>
        queue.id === id
          ? {
              ...queue,
              status: "CANCELED",
            }
          : queue,
      ),
    );
  };

  const filteredQueues = queues.filter((queue) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      queue.queueNumber.toLowerCase().includes(keyword) ||
      queue.patientName.toLowerCase().includes(keyword) ||
      queue.recordNumber.toLowerCase().includes(keyword);

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
            {queues.filter((queue) => queue.status === "WAITING").length}
          </p>

          <p className="mt-1 text-xs text-gray-400">Belum dipanggil</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Dipanggil</p>

          <p className="mt-2 text-2xl font-semibold text-green-600">
            {queues.filter((queue) => queue.status === "CALLED").length}
          </p>

          <p className="mt-1 text-xs text-gray-400">Sedang dipanggil</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Selesai</p>

          <p className="mt-2 text-2xl font-semibold text-blue-600">
            {queues.filter((queue) => queue.status === "COMPLETED").length}
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
              <option value="WAITING">Menunggu</option>
              <option value="CALLED">Dipanggil</option>
              <option value="SKIPPED">Dilewati</option>
              <option value="CANCELED">Dibatalkan</option>
              <option value="COMPLETED">Selesai</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        

        <Table>
          <thead>
            <tr>
              <Th>Antrian</Th> <Th>Nama</Th> <Th>No. Rekam Medis</Th>
              <Th>Poli</Th> <Th>Dokter</Th> <Th>Status</Th>
              <Th className="text-center">Aksi</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {queues.length > 0 ? (
              queues.map((queue) => (
                <tr key={queue.id}>
                  <Td>{queue.queueNumber}</Td> <Td>{queue.patientName}</Td>
                  <Td>{queue.recordNumber}</Td> <Td>{queue.poli}</Td>
                  <Td>{queue.doctor}</Td> <Td>{queue.status}</Td>
                  <Td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          disabled={queue.status !== "WAITING"}
                          onClick={() => handleCall(queue.id)}
                          className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                          Panggil
                        </button>

                        <button
                          type="button"
                          disabled={queue.status !== "WAITING"}
                          onClick={() => handleSkip(queue.id)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                        >
                          Lewati
                        </button>

                        <button
                          type="button"
                          disabled={queue.status !== "WAITING"}
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
