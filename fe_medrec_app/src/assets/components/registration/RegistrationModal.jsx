import Modal from "./../Modal";
import Input from "./../Input";
import Select from "./../Select";
import Textarea from "./../Textarea";

const RegisterPatientModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  onChange,
  polies,
  doctors,
}) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Registrasi Pasien Baru"
      description="Masukkan data pasien untuk membuat data rekam medis baru."
      size="4xl"
    >
      <form onSubmit={onSubmit}>
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
                onChange={onChange}
                placeholder="Masukkan NIK"
                required
              />

              <Input
                label="Nama Lengkap"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                placeholder="Masukkan nama lengkap"
                required
              />

              <Input
                label="Umur"
                name="age"
                type="number"
                min="0"
                value={formData.age || ""}
                onChange={onChange}
                placeholder="Masukkan umur"
                required
              />

              <Select
                label="Jenis Kelamin"
                name="gender"
                value={formData.gender || ""}
                onChange={onChange}
                placeholder="Pilih jenis kelamin"
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
                onChange={onChange}
                required
              />

              <Input
                label="No. Telepon"
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={onChange}
                placeholder="Masukkan nomor telepon"
                required
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Alamat"
                  name="address"
                  value={formData.address || ""}
                  onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
              onChange={onChange}
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
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Registrasi Pasien
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterPatientModal;
