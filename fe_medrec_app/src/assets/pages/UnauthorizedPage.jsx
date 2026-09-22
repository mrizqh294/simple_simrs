import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
        <div className="mb-5 text-6xl font-bold text-red-500">403</div>

        <h1 className="mb-2 text-2xl font-semibold text-gray-800">
          Akses Ditolak
        </h1>

        <p className="mb-6 text-gray-500">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
