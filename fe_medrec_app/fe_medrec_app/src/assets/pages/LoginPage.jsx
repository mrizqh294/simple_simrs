import { useState } from "react";
import Input from "../components/Input";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    console.log("Form data", formData);

    try {
      const result = await loginUser(formData);

      console.log("Data Login:", result);

      if (!result.success) {
        setError(result.message || "Username atau password salah");
        return;
      }

      // Login berhasil
      navigate("/registration", { replace: true });
    } catch (error) {
      console.error("Login gagal:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat login",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Selamat Datang
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Silakan masuk untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* email */}
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
            />

            {/* Password */}
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 SIMRS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
