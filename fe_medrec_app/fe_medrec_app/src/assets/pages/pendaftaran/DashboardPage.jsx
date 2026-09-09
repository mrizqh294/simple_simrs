import { useState } from "react";

import StatCard from "../../components/Statcard";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";
import Modal from "../../components/Modal";

const DashboardRecepsionist = () => {

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ...formData,
      age: Number(formData.age),
      doctorId: Number(formData.doctorId),
      poliId: Number(formData.poliId),
      recepsionistId: Number(formData.recepsionistId),
    };

    console.log("Data yang disubmit:", data);
    alert("Registrasi berhasil!");
    closeModal();
  };

  const stats = [
    {
      title: "Pasien Hari Ini",
      value: "24",
      description: "Pasien terdaftar",
    },
    {
      title: "Menunggu",
      value: "8",
      description: "Menunggu pemeriksaan",
    },
    {
      title: "Selesai",
      value: "16",
      description: "Pemeriksaan selesai",
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pendaftaran dan data pasien hari ini.
          </p>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description} 
            />
          ))}
        </div>

        {/* Registration Action */}
        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Registrasi Pasien
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Daftarkan pasien baru untuk mendapatkan nomor antrian.
              </p>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Registrasi Pasien
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={closeModal}
        title="Registrasi Pasien"
        description="Masukkan data pasien dan informasi kunjungan."
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
                  required
                  options={[
                    { value: "", label: "Pilih poli" },
                    { value: "1", label: "Poli Umum" },
                    { value: "2", label: "Poli Gigi" },
                    { value: "3", label: "Poli Anak" },
                  ]}
                />
                <Select
                  label="Dokter"
                  name="doctorId"
                  value={formData.doctorId || ""}
                  onChange={handleChange}
                  required
                  options={[
                    { value: "", label: "Pilih dokter" },
                    { value: "1", label: "Dr. Budi" },
                    { value: "2", label: "Dr. Andi" },
                    { value: "3", label: "Dr. Siti" },
                  ]}
                />
                <Input
                  label="Tanggal Kunjungan"
                  name="visitDate"
                  type="date"
                  value={formData.visitDate || ""}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Petugas Pendaftaran"
                  name="recepsionistId"
                  value={formData.recepsionistId || ""}
                  onChange={handleChange}
                  placeholder="ID petugas pendaftaran"
                  required
                />
              </div>
            </div>
            {/* KETERANGAN */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Keterangan
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Masukkan keluhan atau keterangan awal pasien.
                </p>
              </div>
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
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Registrasi Pasien
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DashboardRecepsionist;
