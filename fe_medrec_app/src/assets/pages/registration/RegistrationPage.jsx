import { useState } from "react";
import { registerPatient } from "../../services/registrationServices";
import { createVisit } from "../../services/visitServices";
import { updatePatient } from "../../services/patientServices";
import { usePatient } from "../../hooks/usePatient";
import { usePoli } from "../../hooks/usePoli";
import { useDoctor } from "../../hooks/useDoctor";
import Pagination from "../../components/Pagination";
import PatientTable from "../../components/registration/PatientTable";
import RegisterPatientModal from "../../components/registration/RegistrationModal";
import VisitModal from "../../components/registration/VisitModal";
import EditPatientModal from "../../components/registration/EditPatientModal";

const Registration = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPoliId, setSelectedPoliId] = useState(null);

  const LIMIT = 10;

  const { patients, totalPages, refetchPatient } = usePatient({
    page,
    limit: LIMIT,
    search,
  });

  const { polies } = usePoli();
  const { doctors } = useDoctor(selectedPoliId);

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openVisitModal = (patient) => {
    setSelectedPatient(patient);
    setActiveModal("visit");
  };

  const openEditModal = (patient) => {
    setSelectedPatient(patient);
    setActiveModal("edit");

    setFormData({
      nik: patient.nik,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      birthdate: patient.birthdate ? patient.birthdate.split("T")[0] : "",
      phone: patient.phone,
      address: patient.address,
    });
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedPatient(null);
    setFormData({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "poliId") {
      setSelectedPoliId(value);
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let result;

      switch (activeModal) {
        case "register":
          result = await registerPatient({
            ...formData,
            age: Number(formData.age),
            poliId: Number(formData.poliId),
            doctorId: Number(formData.doctorId),
          });
          break;

        case "visit":
          result = await createVisit({
            patientId: selectedPatient.id,
            poliId: Number(formData.poliId),
            doctorId: Number(formData.doctorId),
            description: formData.description,
          });
          break;

        case "edit":
          result = await updatePatient(selectedPatient.id, {
            nik: formData.nik,
            name: formData.name,
            age: Number(formData.age),
            gender: formData.gender,
            birthdate: formData.birthdate,
            phone: formData.phone,
            address: formData.address,
          });
          break;

        default:
          return;
      }

      if (!result?.success) {
        alert(result?.message || "Proses gagal");
        return;
      }

      alert(result.message || "Proses berhasil");

      await refetchPatient();

      closeModal();
    } catch (error) {
      alert(error.message || "Terjadi kesalahan pada server");
    }
  };

  return (
    <>
      <div>
        {/* PAGE HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Registrasi Pasien
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data pasien dan registrasi kunjungan.
          </p>
        </div>
        {/* PATIENT TABLE CARD */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          {/* TABLE HEADER */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Daftar Pasien
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Cari pasien berdasarkan nama, NIK, atau nomor rekam medis.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* SEARCH */}
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Cari pasien..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-80"
                />
              </div>
              {/* REGISTER BUTTON */}
              <button
                type="button"
                onClick={openRegisterModal}
                className="rounded-lg cursor-pointer bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Registrasi Pasien Baru
              </button>
            </div>
          </div>
          {/* TABLE */}
          <PatientTable
            patients={patients}
            page={page}
            limit={LIMIT}
            onEdit={openEditModal}
            onVisit={openVisitModal}
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

      {/* MODAL REGISTRASI PASIEN BARU */}
      <RegisterPatientModal
        show={activeModal === "register"}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        polies={polies}
        doctors={doctors}
      />

      {/* MODAL VISIT PASIEN*/}
      <VisitModal
        show={activeModal === "visit"}
        onClose={closeModal}
        onSubmit={handleSubmit}
        selectedPatient={selectedPatient}
        formData={formData}
        onChange={handleChange}
        polies={polies}
        doctors={doctors}
      />

      {/* MODAL EDIT PASIEN */}
      <EditPatientModal
        show={activeModal === "edit"}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
      />
    </>
  );
};

export default Registration;
