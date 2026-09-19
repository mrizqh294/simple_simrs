import { Table, Th, Td, EmptyRow } from "./../Table";

export default function QueueTable({
  queues,
  handleStatus,
  getStatusClass,
  getStatusLabel,
}) {
  return (
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
        {queues.length > 0 ? (
          queues.map((queue) => (
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
                    onClick={() => handleStatus(queue.id, "DIPANGGIL")}
                    className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Panggil
                  </button>

                  <button
                    type="button"
                    disabled={queue.status !== "MENUNGGU"}
                    onClick={() => handleStatus(queue.id, "DILEWATI")}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                  >
                    Lewati
                  </button>

                  <button
                    type="button"
                    disabled={queue.status !== "MENUNGGU"}
                    onClick={() => handleStatus(queue.id, "BATAL")}
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
  );
}
