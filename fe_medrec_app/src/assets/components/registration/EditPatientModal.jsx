import Modal from "./../Modal";
import Input from "./../Input";
import Select from "./../Select";
import Textarea from "./../Textarea";

const EditPatientModal = ({ show, onClose, onSubmit, formData, onChange }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Edit Data Pasien"
      description="Masukkan data pasien untuk mengubah data"
      size="4xl"
    >
      <form onSubmit={onSubmit}>
        <div className="space-y-6 px-6 py-5">
          {/* DATA PASIEN */}
          <div>
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
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPatientModal;
