import { useState } from "react";
import Modal from "../../components/Modal";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
const Registration = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const patients = [
    {
      id: 1,
      recordNumber: "RM-20260001",
      nik: "3212345678900001",
      name: "Muhammad Rizki",
      age: 22,
      gender: "L",
      birthdate: "2004-04-29",
      phone: "081234567890",
      address: "Subang",
    },
    {
      id: 2,
      recordNumber: "RM-20260002",
      nik: "3212345678900002",
      name: "Siti Aminah",
      age: 35,
      gender: "P",
      birthdate: "1991-02-12",
      phone: "081234567891",
      address: "Bandung",
    },
    {
      id: 3,
      recordNumber: "RM-20260003",
      nik: "3212345678900003",
      name: "Andi Setiawan",
      age: 41,
      gender: "L",
      birthdate: "1985-07-21",
      phone: "081234567892",
      address: "Sumedang",
    },
  ];
  const filteredPatients = patients.filter((patient) => {
    const keyword = search.toLowerCase();
    return (
      patient.name.toLowerCase().includes(keyword) ||
      patient.nik.includes(keyword) ||
      patient.recordNumber.toLowerCase().includes(keyword)
    );
  });
  const handleEdit = (patient) => {
    console.log("Edit pasien:", patient);
  };
  const handleAddVisit = (patient) => {
    console.log("Tambah kunjungan:", patient);
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
                onClick={() => setShowModal(true)}
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Registrasi Pasien Baru
              </button>
            </div>
          </div>
          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-250 text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 font-medium text-gray-500">No</th>
                  <th className="px-5 py-3 font-medium text-gray-500">
                    No. Rekam Medis
                  </th>
                  <th className="px-5 py-3 font-medium text-gray-500">NIK</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Nama</th>
                  <th className="px-5 py-3 font-medium text-gray-500">Umur</th>
                  <th className="px-5 py-3 font-medium text-gray-500">
                    Jenis Kelamin
                  </th>
                  <th className="px-5 py-3 font-medium text-gray-500">
                    No. Telepon
                  </th>
                  <th className="px-5 py-3 text-center font-medium text-gray-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <tr
                      key={patient.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 text-gray-500">{index + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-700">
                        {patient.recordNumber}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{patient.nik}</td>
                      <td className="px-5 py-4 font-medium text-gray-800">
                        {patient.name}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {patient.age} tahun
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {patient.gender === "L" ? "Laki-laki" : "Perempuan"}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {patient.phone}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() => handleEdit(patient)}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800"
                          >
                            Edit
                          </button>
                          {/* ADD VISIT */}
                          <button
                            type="button"
                            onClick={() => handleAddVisit(patient)}
                            className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 transition hover:bg-green-100"
                          >
                            Tambah Kunjungan
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      Data pasien tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* TABLE FOOTER */}
          <div className="border-t border-gray-100 px-5 py-4">
            <p className="text-xs text-gray-400">
              Menampilkan {filteredPatients.length} dari {patients.length}
              pasien
            </p>
          </div>
        </div>
      </div>
      {/* MODAL REGISTRASI PASIEN BARU */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Registrasi Pasien Baru"
        description="Masukkan data pasien untuk membuat data rekam medis baru."
        size="4xl"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("Registrasi pasien");
          }}
        >
          <div className="space-y-6 px-6 py-5">
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
                  placeholder="Masukkan NIK"
                  required
                />
                <Input
                  label="Nama Lengkap"
                  name="name"
                  placeholder="Masukkan nama lengkap"
                  required
                />
                <Input
                  label="Umur"
                  name="age"
                  type="number"
                  min="0"
                  placeholder="Masukkan umur"
                  required
                />
                <Input
                  label="Tanggal Lahir"
                  name="birthdate"
                  type="date"
                  required
                />
                <Input
                  label="No. Telepon"
                  name="phone"
                  type="tel"
                  placeholder="Masukkan nomor telepon"
                  required
                />
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <Textarea
                label="Alamat"
                name="address"
                placeholder="Masukkan alamat lengkap pasien"
                rows={3}
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Simpan Pasien
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Registration;
