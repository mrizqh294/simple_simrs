import { useState } from "react";
import Modal from "../../components/Modal";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { Table, Th, Td, EmptyRow } from "../../components/Table";
import { registerPatient } from "../../services/registrationServices";
import { createVisit } from "../../services/visitServices";
import { updatePatient } from "../../services/patientServices";
import { useRegistration } from "../../hooks/useRegistration";

const Registration = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [formData, setFormData] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { patients, polies, doctors, loading, error, refetch } =
    useRegistration({
      page: page,
      limit: limit,
      search: search,
    });

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let data;
      let result;

      if (activeModal === "register") {
        data = {
          ...formData,
          age: Number(formData.age),
          poliId: Number(formData.poliId),
          doctorId: Number(formData.doctorId),
        };

        result = await registerPatient(data);
      }

      if (activeModal === "visit") {
        data = {
          patientId: selectedPatient.id,
          poliId: Number(formData.poliId),
          doctorId: Number(formData.doctorId),
          description: formData.description,
        };

        result = await createVisit(data);
      }

      if (activeModal === "edit") {
        data = {
          nik: formData.nik,
          name: formData.name,
          age: Number(formData.age),
          gender: formData.gender,
          birthdate: formData.birthdate,
          phone: formData.phone,
          address: formData.address,
        };

        result = await updatePatient(selectedPatient.id, data);
      }

      if (!result?.success) {
        alert(result?.message || "Proses gagal");
        return;
      }

      alert(result.message || "Proses berhasil");

      await refetch();

      setFormData({});
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
                  onChange={(event) => setSearch(event.target.value)}
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
                    <Td>{index + 1}</Td>

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

                    <Td>
                      {patient.gender === "L" ? "Laki-laki" : "Perempuan"}
                    </Td>

                    <Td>{patient.phone}</Td>

                    <Td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(patient)}
                          className="rounded-lg cursor-pointer border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => openVisitModal(patient)}
                          className="rounded-lg cursor-pointer bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-100"
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
          {/* TABLE FOOTER */}
          <div className="border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400">
              Menampilkan {patients.length} dari {patients.length}
              pasien
            </p>
          </div>
        </div>
      </div>

      {/* MODAL REGISTRASI PASIEN BARU */}
      <Modal
        show={activeModal === "register"}
        onClose={closeModal}
        title="Registrasi Pasien Baru"
        description="Masukkan data pasien untuk membuat data rekam medis baru."
        size="4xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 py-5">
            {/* DATA PASIEN */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Data Pasien
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Masukkan informasi identitas pasien.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="NIK"
                  name="nik"
                  value={formData.nik || ""}
                  onChange={handleChange}
                  placeholder="Masukkan NIK"
                  required
                />
                <Input
                  label="Nama Lengkap"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
                <Input
                  label="Umur"
                  name="age"
                  type="number"
                  min="0"
                  value={formData.age || ""}
                  onChange={handleChange}
                  placeholder="Masukkan umur"
                  required
                />
                <Select
                  label="Jenis Kelamin"
                  name="gender"
                  value={formData.gender || ""}
                  placeholder="Pilih jenis Kelamin"
                  onChange={handleChange}
                  required
                  options={[
                    { value: "L", label: "Laki-laki" },
                    { value: "P", label: "Perempuan" },
                  ]}
                />
                <Input
                  label="Tanggal Lahir"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate || ""}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="No. Telepon"
                  name="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon"
                  required
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Alamat"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap pasien"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
            {/* DATA KUNJUNGAN */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Data Kunjungan
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Masukkan informasi kunjungan pasien.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Poli"
                  name="poliId"
                  value={formData.poliId || ""}
                  onChange={handleChange}
                  placeholder="Pilih poli"
                  required
                  options={polies.map((poli) => ({
                    value: poli.id,
                    label: poli.name,
                  }))}
                />
                <Select
                  label="Dokter"
                  name="doctorId"
                  value={formData.doctorId || ""}
                  onChange={handleChange}
                  placeholder="Pilih dokter"
                  required
                  options={doctors.map((doctor) => ({
                    value: doctor.id,
                    label: doctor.name,
                  }))}
                />
              </div>
            </div>

            {/* KETERANGAN */}
            <div className="border-t border-gray-100 pt-6">
              <Textarea
                label="Keterangan"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Masukkan keluhan atau keterangan pasien"
                rows={4}
                required
              />
            </div>
          </div>
          {/* FOOTER */}
          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg cursor-pointer border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg cursor-pointer bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Registrasi Pasien
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL VISIT PASIEN*/}
      <Modal
        show={activeModal === "visit"}
        onClose={closeModal}
        title="Tambahkan Kunjungan Pasien"
        description="Masukkan data kunjungan untuk membuat data rekam medis baru."
        size="4xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6">
            {/* DATA KUNJUNGAN */}
            <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
                <input value={selectedPatient?.id} name="patientId" hidden />
                <Input
                  label="Nama Lengkap"
                  name="name"
                  placeholder={selectedPatient?.name || ""}
                  disabled={true}
                  readOnly
                />

                <Input
                  label="No. Rekam Medis"
                  name="recordNumber"
                  placeholder={selectedPatient?.recordNumber || ""}
                  disabled={true}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                  label="Poli"
                  name="poliId"
                  value={formData.poliId || ""}
                  onChange={handleChange}
                  required
                  options={polies.map((poli) => ({
                    value: poli.id,
                    label: poli.name,
                  }))}
                />
                <Select
                  label="Dokter"
                  name="doctorId"
                  value={formData.doctorId || ""}
                  onChange={handleChange}
                  required
                  options={doctors.map((doctor) => ({
                    value: doctor.id,
                    label: doctor.name,
                  }))}
                />
              </div>
            </div>
            {/* KETERANGAN */}
            <div className="border-t border-gray-100 pt-6">
              <Textarea
                label="Keterangan"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Masukkan keluhan atau keterangan pasien"
                rows={4}
                required
              />
            </div>
          </div>
          {/* FOOTER */}
          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg cursor-pointer border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg cursor-pointer bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL EDIT PASIEN */}
      <Modal
        show={activeModal === "edit"}
        onClose={closeModal}
        title="Edit Data Pasien"
        description="Masukkan data pasien untuk mengubah data"
        size="4xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 py-5">
            {/* DATA PASIEN */}
            <div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  label="NIK"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  placeholder="Masukkan NIK"
                  required
                />
                <Input
                  label="Nama Lengkap"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
                <Input
                  label="Umur"
                  name="age"
                  type="number"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Masukkan umur"
                  required
                />
                <Select
                  label="Jenis Kelamin"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  options={[
                    { value: "", label: "Pilih jenis kelamin" },
                    { value: "L", label: "Laki-laki" },
                    { value: "P", label: "Perempuan" },
                  ]}
                />
                <Input
                  label="Tanggal Lahir"
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="No. Telepon"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Masukkan nomor telepon"
                  required
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Alamat"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Masukkan alamat lengkap pasien"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          {/* FOOTER */}
          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg cursor-pointer border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg cursor-pointer bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Registration;
