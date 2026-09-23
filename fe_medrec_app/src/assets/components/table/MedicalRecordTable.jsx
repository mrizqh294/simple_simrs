import { Table, Th, Td, EmptyRow } from "./../Table";

export default function MedicalRecordTable({ medicalRecords }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Tgl. Pemeriksan</Th>
          <Th>Nama</Th>
          <Th>No. Rekam Medis</Th>
          <Th>Diagnosis</Th>
          <Th>Tindakan</Th>
          <Th>Resep Obat</Th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {medicalRecords.length > 0 ? (
          medicalRecords.map((medicalRecord) => (
            <tr key={medicalRecord.id}>
              <Td>{medicalRecord.visit.visitDate.split("T")[0]}</Td>

              <Td>{medicalRecord.visit.patient.name}</Td>

              <Td>{medicalRecord.visit.patient.recordNumber}</Td>

              <Td>{medicalRecord.diagnosis}</Td>

              <Td>{medicalRecord.actionPlan}</Td>

              <Td>{medicalRecord.receipt}</Td>
            </tr>
          ))
        ) : (
          <EmptyRow colSpan={5} />
        )}
      </tbody>
    </Table>
  );
}
