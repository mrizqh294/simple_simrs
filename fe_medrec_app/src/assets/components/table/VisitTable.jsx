import { Table, Th, Td, EmptyRow } from "./../Table";

export default function VisitTable({
  visits,
  openModal,
  openEditModal,
  // confirmDelete,
  getStatusClass,
  getStatusLabel,
}) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nama Pasien</Th>
          <Th>No. Rekam Medis</Th>
          <Th>Dokter</Th>
          {role === "DOKTER" && <Th>Keluhan</Th>}
          <Th>Status</Th>
          <Th className="text-center">Aksi</Th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {visits.length > 0 ? (
          visits.map((visit) => (
            <tr key={visit.id}>
              <Td>{visit.patient?.name}</Td>

              <Td>{visit.patient?.recordNumber}</Td>

              <Td>{visit.doctor?.name}</Td>

              {role === "DOKTER" && <Td>{visit.description}</Td>}

              <Td>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                    visit.status,
                  )}`}
                >
                  {getStatusLabel(visit.status)}
                </span>
              </Td>

              <Td className="text-center">
                <div className="flex items-center justify-center gap-2">
                  {role === "DOKTER" && (
                    <button
                      type="button"
                      disabled={visit.status === "SELESAI"}
                      onClick={() => openModal(visit)}
                      className="cursor-pointer rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      Periksa
                    </button>
                  )}

                  {(role === "ADMIN" || role === "PENDAFTARAN") && (
                    <button
                      type="button"
                      onClick={() => openEditModal(visit)}
                      className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                    >
                      Edit
                    </button>
                  )}

                  {/* {role === "ADMIN" && (
                    <button
                      type="button"
                      onClick={() => confirmDelete(visit)}
                      className="cursor-pointer rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-100"
                    >
                      Hapus
                    </button>
                  )} */}
                </div>
              </Td>
            </tr>
          ))
        ) : (
          <EmptyRow colSpan={6} />
        )}
      </tbody>
    </Table>
  );
}
