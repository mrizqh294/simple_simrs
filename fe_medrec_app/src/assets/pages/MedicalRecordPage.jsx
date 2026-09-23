import { useState } from "react";
import { useMedicalRecord } from "../hooks/useMedicalRecords";
import Pagination from "../components/Pagination";
import MedicalRecordTable from "../components/table/MedicalRecordTable";

const MedicalRecordPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const LIMIT = 10;

  const { medicalRecords, totalPages } = useMedicalRecord({
    page,
    limit: LIMIT,
    search,
  });

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

  return (
    <>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Riwayat Rekam Medis
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Lihat dan cari data rekam medis pasien yang sudah anda periksa.
          </p>
        </div>

        {/* MEDICAL RECORD TABLE CARD */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Daftar Rekam Medis
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Cari berdasarkan nama, nomor rekam medis, atau NIK.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Cari nama, No. RM, atau NIK..."
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-80"
              />
            </div>
          </div>

          {/* TABLE */}
          <MedicalRecordTable medicalRecords={medicalRecords} />

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
    </>
  );
};

export default MedicalRecordPage;