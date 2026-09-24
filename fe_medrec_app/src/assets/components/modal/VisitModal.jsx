import Modal from "./../Modal";
import Input from "./../Input";
import Select from "./../Select";
import Textarea from "./../Textarea";

const VisitModal = ({
  show,
  onClose,
  onSubmit,
  selectedPatient,
  formData,
  onChange,
  polies,
  doctors,
}) => {
  console.log("form data :", formData)
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Tambahkan Kunjungan Pasien"
      description="Masukkan data kunjungan untuk membuat data rekam medis baru."
      size="4xl"
    >
      <form onSubmit={onSubmit}>
        <div className="space-y-6 px-6">
          {/* DATA KUNJUNGAN */}
          <div className="border-t border-gray-100 pt-6">
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                value={selectedPatient?.id || ""}
                name="patientId"
                hidden
                readOnly
              />

              <Input
                label="Nama Lengkap"
                name="name"
                placeholder={selectedPatient?.name || ""}
                disabled
                readOnly
              />

              <Input
                label="No. Rekam Medis"
                name="recordNumber"
                placeholder={selectedPatient?.recordNumber || ""}
                disabled
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                label="Poli"
                name="poliId"
                value={formData.poliId || ""}
                onChange={onChange}
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
            Simpan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default VisitModal;
