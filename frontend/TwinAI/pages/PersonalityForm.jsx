import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function PersonalityPage() {
  const [hobbies, setHobbies] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [qualities, setQualities] = useState("");
  const [tone, setTone] = useState("neutral");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ create navigate functiona

  const BASE_URL = `${apiUrl}/api/personality`; // backend URL
  const userId = localStorage.getItem("userId"); // must be stored after login
  const token = localStorage.getItem("token");   // auth token

  // Fetch personality data on mount
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

  // Handle form submit
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

      // ✅ Navigate to chat page after successful save
      if (res.status === 200 || res.status === 201) {
         if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
      }
        setTimeout(() => navigate("/personality/chatpage"), 500); // small delay to show message
      }
    } catch (error) {
      console.error("Save error:", error);
      setMessage(error.response?.data?.message || "Error saving personality");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Personality</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hobbies */}
        <div>
          <label className="block font-semibold mb-1">Hobbies (comma-separated)</label>
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Favorite Food */}
        <div>
          <label className="block font-semibold mb-1">Favorite Food</label>
          <input
            type="text"
            value={favoriteFood}
            onChange={(e) => setFavoriteFood(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Qualities */}
        <div>
          <label className="block font-semibold mb-1">Qualities (comma-separated)</label>
          <input
            type="text"
            value={qualities}
            onChange={(e) => setQualities(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Tone */}
        <div>
          <label className="block font-semibold mb-1">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 border rounded-lg"
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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl transition"
        >
          {loading ? "Saving..." : "Save Personality"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
