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
//hello jii
  return (
    <div className="flex h-screen bg-orange-500 items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 relative">
        {/* Floating Icon */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-lg">
          <FaUser className="text-white text-xl" />
        </div>

        <h2 className="text-2xl font-bold text-center mt-6 mb-6">Member Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            LOGIN
          </button>
        </form>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
