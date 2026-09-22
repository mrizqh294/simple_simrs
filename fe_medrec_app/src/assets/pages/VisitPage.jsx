import { useState } from "react";
import { useVisit } from "./../hooks/useVisit";
import Pagination from "./../components/Pagination";
import VisitTable from "./../components/table/VisitTable";
import ExaminationModal from "./../components/modal/ExaminationModal";

const VisitPage = () => {
  const [page, setPage] = useState(1);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedVisit, setSelectedVisit] = useState(null);

  const LIMIT = 10;

  const { visits, totalPages, refetchVisit } = useVisit({
    page,
    limit: LIMIT,
  });

  console.log(visits);

  const openExaminationModal = (visit) => {
    setSelectedVisit(visit);
    setActiveModal("examination");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedVisit(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Nanti proses pemeriksaan ditambahkan di sini

    closeModal();
    await refetchVisit();
  };

  return (
    <>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Daftar Kunjungan
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola dan periksa pasien yang memiliki kunjungan.
          </p>
        </div>

        {/* VISIT TABLE CARD */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="border-b border-gray-100 p-5">
            <h2 className="text-base font-semibold text-gray-800">
              Daftar Kunjungan
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Daftar pasien yang menunggu pemeriksaan.
            </p>
          </div>

          {/* TABLE */}
          <VisitTable visits={visits} openModal={openExaminationModal} />

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

      {/* MODAL PEMERIKSAAN */}
      <ExaminationModal
        show={activeModal === "examination"}
        onClose={closeModal}
        onSubmit={handleSubmit}
        selectedVisit={selectedVisit}
        formData={formData}
        onChange={handleChange}
      />
    </>
  );
};

export default VisitPage;
