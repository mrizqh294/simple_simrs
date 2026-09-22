import Modal from "../Modal";
import Input from "../Input";
import Textarea from "../Textarea";

const ExaminationModal = ({
  show,
  onClose,
  onSubmit,
  selectedVisit,
  formData,
  onChange,
}) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      title="Pemeriksaan Pasien"
      description="Masukkan hasil pemeriksaan dan rekam medis pasien."
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
                Informasi pasien yang sedang diperiksa.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Nama Pasien"
                value={selectedVisit?.patient?.name || ""}
                disabled
              />

              <Input
                label="No. Rekam Medis"
                value={selectedVisit?.patient?.recordNumber || ""}
                disabled
              />

              <Input
                label="Dokter"
                value={selectedVisit?.doctor?.name || ""}
                disabled
              />

              <Input
                label="Pendaftaran"
                value={selectedVisit?.receptionist?.name || ""}
                disabled
              />
            </div>
          </div>

          {/* HASIL PEMERIKSAAN */}
          <div className="border-t border-gray-100 pt-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Hasil Pemeriksaan
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Masukkan hasil pemeriksaan fisik pasien.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Tekanan Darah"
                name="bloodTension"
                value={formData.bloodTension || ""}
                onChange={onChange}
                placeholder="Contoh: 120/80 mmHg"
                required
              />

              <Input
                label="Suhu Tubuh"
                name="temperature"
                value={formData.temperature || ""}
                onChange={onChange}
                placeholder="Contoh: 36.5 °C"
                required
              />

              <Input
                label="Tinggi Badan"
                name="height"
                type="number"
                min="0"
                step="0.1"
                value={formData.height || ""}
                onChange={onChange}
                placeholder="Contoh: 170"
                required
              />

              <Input
                label="Berat Badan"
                name="weight"
                type="number"
                min="0"
                step="0.1"
                value={formData.weight || ""}
                onChange={onChange}
                placeholder="Contoh: 65"
                required
              />
            </div>
          </div>

          {/* KELUHAN DAN DIAGNOSIS */}
          <div className="border-t border-gray-100 pt-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800">
                Diagnosis
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Masukkan gejala dan hasil diagnosis pasien.
              </p>
            </div>

            <div className="space-y-4">
              <Textarea
                label="Gejala"
                name="symptom"
                value={formData.symptom || ""}
                onChange={onChange}
                placeholder="Masukkan gejala yang dialami pasien"
                rows={4}
                required
              />

              <Textarea
                label="Diagnosis"
                name="diagnosis"
                value={formData.diagnosis || ""}
                onChange={onChange}
                placeholder="Masukkan diagnosis pasien"
                rows={4}
                required
              />
            </div>
          </div>

          {/* RENCANA TINDAKAN */}
          <div className="border-t border-gray-100 pt-6">
            <Textarea
              label="Rencana Tindakan"
              name="actionPlan"
              value={formData.actionPlan || ""}
              onChange={onChange}
              placeholder="Masukkan rencana tindakan atau terapi pasien"
              rows={4}
              required
            />
          </div>

          {/* RESEP */}
          <div className="border-t border-gray-100 pt-6">
            <Textarea
              label="Resep"
              name="receipt"
              value={formData.receipt || ""}
              onChange={onChange}
              placeholder="Masukkan resep obat pasien"
              rows={5}
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
            Simpan Pemeriksaan
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ExaminationModal;