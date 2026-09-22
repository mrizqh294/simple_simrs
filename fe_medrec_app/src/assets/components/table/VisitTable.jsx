import { Table, Th, Td, EmptyRow } from "./../Table";

export default function VisitTable({ visits, openModal, getStatusClass, getStatusLabel }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Nama Pasien</Th>
          <Th>No. Rekam Medis</Th>
          <Th>Dokter</Th>
          <Th>Keluhan</Th>
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

              <Td>{visit.description}</Td>

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
                <button
                  type="button"
                  disabled={visit.status === "SELESAI"}
                  onClick={() => openModal(visit)}
                  className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Periksa
                </button>
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
