import { Table, Th, Td, EmptyRow } from "../Table";

const PatientTable = ({ patients, page = 1, limit = 10, onEdit, onVisit }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>No</Th>
          <Th>No. Rekam Medis</Th>
          <Th>NIK</Th>
          <Th>Nama</Th>
          <Th>Umur</Th>
          <Th>Jenis Kelamin</Th>
          <Th>No. Telepon</Th>
          <Th className="text-center">Aksi</Th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <tr key={patient.id} className="transition hover:bg-gray-50">
              <Td>{(page - 1) * limit + index + 1}</Td>

              <Td>
                <span className="font-medium text-gray-700">
                  {patient.recordNumber}
                </span>
              </Td>

              <Td>{patient.nik}</Td>

              <Td>
                <span className="font-medium text-gray-800">
                  {patient.name}
                </span>
              </Td>

              <Td>{patient.age} tahun</Td>

              <Td>{patient.gender === "L" ? "Laki-laki" : "Perempuan"}</Td>

              <Td>{patient.phone}</Td>

              <Td className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(patient)}
                    className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onVisit(patient)}
                    className="cursor-pointer rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-100"
                  >
                    Tambah Kunjungan
                  </button>
                </div>
              </Td>
            </tr>
          ))
        ) : (
          <EmptyRow colSpan={8} message="Data pasien tidak ditemukan." />
        )}
      </tbody>
    </Table>
  );
};

export default PatientTable;
