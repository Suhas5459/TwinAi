import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${apiUrl}/api/auth/register`,
        formData
      );
      if (res.data.success) {
        alert("✅ Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md h-[70vh] flex flex-col justify-center p-0 border-2 border-blue-400 rounded-xl shadow-lg">
        <div className="px-8 py-10 flex-1 flex flex-col justify-center bg-transparent">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-400 p-4 rounded-full shadow-lg mb-3">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-center text-blue-500 mb-1 drop-shadow">
              Create your account
            </h1>
            <p className="text-white text-center mb-6 text-sm drop-shadow">
              Sign up to get started with TwinAI
            </p>
          </div>
          {error && (
            <div className="mb-4">
              <p className="text-red-300 text-center bg-red-100 bg-opacity-30 py-2 rounded-lg text-sm font-medium drop-shadow">
                {error}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg opacity-70" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full pl-11 pr-3 py-3 border border-white border-opacity-30 rounded-lg bg-white/10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ backdropFilter: "blur(0px)" }}
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg opacity-70" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full pl-11 pr-3 py-3 border border-white border-opacity-30 rounded-lg bg-white/10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ backdropFilter: "blur(0px)" }}
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg opacity-70" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="w-full pl-11 pr-3 py-3 border border-white border-opacity-30 rounded-lg bg-white/10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ backdropFilter: "blur(0px)" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 bg-opacity-80 text-white font-semibold py-3 rounded-xl shadow-lg transition hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-white text-sm drop-shadow">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-200 font-semibold hover:underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}