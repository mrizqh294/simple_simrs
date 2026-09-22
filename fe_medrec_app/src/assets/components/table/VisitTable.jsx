import { Table, Th, Td, EmptyRow } from "./../Table";

export default function VisitTable({ visits, openModal }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Nama Pasien</Th>
          <Th>No. Rekam Medis</Th>
          <Th>Dokter</Th>
          <Th>Pendaftaran</Th>
          <Th>Keluhan</Th>
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

              <Td>{visit.receptionist?.name}</Td>

              <Td>{visit.description}</Td>

              <Td className="text-center">
                <button
                  type="button"
                  onClick={() => openModal(visit)}
                  className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700"
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
