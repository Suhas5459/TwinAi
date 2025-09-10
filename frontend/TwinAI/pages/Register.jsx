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
      <div className="bg-white bg-opacity-80 rounded-xl shadow-lg w-full max-w-md p-8 relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-400 p-4 rounded-full shadow-lg">
          <FaUser className="text-white text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-center mt-6 mb-2">Create your account</h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Sign up to get started with TwinAI
        </p>
        {error && (
          <div className="mb-4">
            <p className="text-red-600 text-center bg-red-100 py-2 rounded-lg text-sm font-medium">
              {error}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full pl-11 pr-3 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full pl-11 pr-3 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full pl-11 pr-3 py-3 border rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}