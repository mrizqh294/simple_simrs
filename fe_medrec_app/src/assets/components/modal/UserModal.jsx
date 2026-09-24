import Modal from "../Modal";
import Input from "../Input";
import Select from "../Select";

const UserModal = ({
  show,
  onClose,
  onSubmit,
  formData,
  onChange,
  mode,
  polies,
}) => {
  const isEdit = mode === "edit";
  const isDoctor = formData.role === "DOKTER";

  return (
    <Modal
      show={show}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Tambah User"}
      description={
        isEdit
          ? "Ubah data user dan hak akses pengguna."
          : "Masukkan data untuk membuat user baru."
      }
      size="lg"
    >
      <form onSubmit={onSubmit}>
        <div className="space-y-6 px-6 py-5">
          {/* DATA USER */}
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Data User</h3>

              <p className="mt-1 text-xs text-gray-400">
                Masukkan informasi akun pengguna.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* NAMA */}
              <Input
                label="Nama Lengkap"
                name="name"
                value={formData.name || ""}
                onChange={onChange}
                placeholder="Masukkan nama lengkap"
                required
              />

              {/* EMAIL */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={onChange}
                placeholder="Masukkan alamat email"
                required
              />

              {/* PASSWORD */}
              <Input
                label={isEdit ? "Password Baru" : "Password"}
                name="password"
                type="password"
                value={formData.password || ""}
                onChange={onChange}
                placeholder={
                  isEdit
                    ? "Kosongkan jika tidak ingin mengubah password"
                    : "Masukkan password"
                }
                required={!isEdit}
              />

              {/* ROLE */}
              <Select
                label="Role"
                name="role"
                value={formData.role || ""}
                onChange={onChange}
                placeholder="Pilih role"
                required
                options={[
                  {
                    value: "ADMIN",
                    label: "Admin",
                  },
                  {
                    value: "DOKTER",
                    label: "Dokter",
                  },
                  {
                    value: "PENDAFTARAN",
                    label: "Pendaftaran",
                  },
                ]}
              />

              {/* POLIKLINIK */}
              {isDoctor && (
                <Select
                  label="Poliklinik"
                  name="poliId"
                  value={formData.poliId || ""}
                  onChange={onChange}
                  placeholder="Pilih poliklinik"
                  required
                  options={polies.map((poli) => ({
                    value: poli.id,
                    label: poli.name,
                  }))}
                />
              )}
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
            {isEdit ? "Simpan Perubahan" : "Tambah User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
