import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

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
        "http://localhost:3000/api/auth/register",
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
    
    <Layout>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-100 rounded-full p-3 mb-3">
              <FaUser className="text-blue-500 text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
              Create your account
            </h1>
            <p className="text-gray-500 text-sm">
              Sign up to get started with TwinAI
            </p>
          </div>
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
                className="w-full pl-11 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
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
                className="w-full pl-11 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
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
                className="w-full pl-11 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
    </Layout>
  );
}
