import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
const apiUrl = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      navigate("/personality");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
            <div className="bg-yellow-400 p-4 rounded-full shadow-lg mb-3">
              <FaUser className="text-white text-2xl" />
            </div>
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-1 drop-shadow">
              Member Login
            </h2>
            <p className="text-white text-center mb-6 text-sm drop-shadow">
              Welcome back to TwinAI
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full pl-11 pr-3 py-3 border border-white border-opacity-30 rounded-lg bg-white/10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-lg opacity-70" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full pl-11 pr-3 py-3 border border-white border-opacity-30 rounded-lg bg-white/10 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button className="w-full bg-blue-500 bg-opacity-80 text-white py-3 rounded-xl shadow-lg transition hover:bg-blue-600 font-semibold disabled:opacity-60 disabled:cursor-not-allowed">
              LOGIN
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-white text-sm drop-shadow">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-200 font-semibold hover:underline">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}