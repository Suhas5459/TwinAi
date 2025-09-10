import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function PersonalityPage() {
  const [hobbies, setHobbies] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [qualities, setQualities] = useState("");
  const [tone, setTone] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const BASE_URL = `${apiUrl}/api/personality`;
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPersonality = async () => {
      if (!userId) {
        setMessage("User ID not found. Please login.");
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setHobbies(data.hobbies?.join(", ") || "");
        setFavoriteFood(data.favoriteFood || "");
        setQualities(data.qualities?.join(", ") || "");
        setTone(data.tone || "neutral");
      } catch (err) {
        console.log("No personality found yet");
        setMessage("No personality found yet");
      }
    };

    fetchPersonality();
  }, [userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID not found. Please login.");
      return;
    }

    if (!hobbies || !favoriteFood || !qualities) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        BASE_URL,
        {
          userId,
          hobbies: hobbies.split(",").map((h) => h.trim()),
          favoriteFood,
          qualities: qualities.split(",").map((q) => q.trim()),
          tone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message);

      if (res.status === 200 || res.status === 201) {
        if (res.data.userId) {
          localStorage.setItem("userId", res.data.userId);
        }
        setTimeout(() => navigate("/personality/chatpage"), 500);
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage(error.response?.data?.message || "Error saving personality");
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
      <div className="bg-white bg-opacity-80 rounded-xl shadow-lg w-full max-w-md h-[90vh] flex flex-col justify-center p-0">
        <div className="px-8 py-10 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Your Personality</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Hobbies (comma-separated)</label>
              <input
                type="text"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Favorite Food</label>
              <input
                type="text"
                value={favoriteFood}
                onChange={(e) => setFavoriteFood(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Qualities (comma-separated)</label>
              <input
                type="text"
                value={qualities}
                onChange={(e) => setQualities(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="neutral">Neutral</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="funny">Funny</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition"
            >
              {loading ? "Saving..." : "Save Personality"}
            </button>
          </form>
          {message && (
            <p className="mt-6 text-center text-green-600 font-semibold">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}