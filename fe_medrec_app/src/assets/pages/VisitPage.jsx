import { useState } from "react";
import { useVisit } from "./../hooks/useVisit";
import Pagination from "./../components/Pagination";
import VisitTable from "./../components/table/VisitTable";
import ExaminationModal from "./../components/modal/ExaminationModal";
import { createMedicalRecord } from "../services/medicalRecordServices";

const VisitPage = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedVisit, setSelectedVisit] = useState(null);

  const LIMIT = 10;

  const { visits, totalPages, refetchVisit } = useVisit({
    page,
    limit: LIMIT,
    filter: status,
  });

  const getStatusLabel = (status) => {
    const statusMap = {
      MENUNGGU: "Menunggu",
      BATAL: "Dibatalkan",
      SELESAI: "Selesai",
    };

    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const statusMap = {
      MENUNGGU: "bg-yellow-50 text-yellow-700",
      BATAL: "bg-red-50 text-red-600",
      SELESAI: "bg-blue-50 text-blue-700",
    };

    return statusMap[status] || "bg-gray-100 text-gray-600";
  };

  const openExaminationModal = (visit) => {
    setSelectedVisit(visit);
    setActiveModal("examination");
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedVisit(null);
    setFormData({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await createMedicalRecord({
      visitId: selectedVisit.id,
      bloodTension: formData.bloodTension,
      temperature: formData.temperature,
      height: Number(formData.height),
      weight: Number(formData.weight),
      diagnosis: formData.diagnosis,
      symptom: formData.symptom,
      actionPlan: formData.actionPlan,
      receipt: formData.receipt,
    });

    if (!result?.success) {
      alert(result?.message || "Proses gagal");
      return;
    }

    alert(result.message || "Proses berhasil");

    closeModal();
    await refetchVisit();
  };

  return (
    <>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Daftar Kunjungan Hari Ini
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola dan periksa pasien yang memiliki kunjungan.
          </p>
        </div>

        {/* VISIT TABLE CARD */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Daftar Kunjungan
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Daftar pasien yang memiliki kunjungan.
              </p>
            </div>

            {/* STATUS FILTER */}
            <select
              value={status}
              onChange={handleStatusChange}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            >
              <option value="">Semua Status</option>
              <option value="MENUNGGU">Menunggu</option>
              <option value="SELESAI">Selesai</option>
              <option value="BATAL">Dibatalkan</option>
            </select>
          </div>

          {/* TABLE */}
          <VisitTable
            visits={visits}
            openModal={openExaminationModal}
            getStatusClass={getStatusClass}
            getStatusLabel={getStatusLabel}
          />

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