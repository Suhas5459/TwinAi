import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await axios.post(`${apiUrl}/api/chat`, {
        userId,
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to get response" },
      ]);
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
      <div className="bg-white bg-opacity-80 rounded-xl shadow-lg w-full max-w-md h-[90vh] flex flex-col p-0">
        {/* Users Online */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-400 inline-block"></span>
            <span className="font-semibold text-gray-700">You</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="w-4 h-4 rounded-full bg-blue-400 inline-block"></span>
            <span className="font-semibold text-gray-700">Twin</span>
          </div>
        </div>
        {/* Chat Messages */}
        <div className="border-x border-b rounded-b-lg px-6 py-4 flex-1 overflow-y-auto bg-gray-50 bg-opacity-70">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <span
                  className={`w-8 h-8 rounded-full ${
                    msg.role === "user" ? "bg-green-400" : "bg-blue-400"
                  } flex-shrink-0`}
                ></span>
                <div
                  className={`px-4 py-2 rounded-2xl shadow ${
                    msg.role === "user"
                      ? "bg-indigo-200 text-gray-800"
                      : "bg-white text-gray-700 border"
                  }`}
                >
                  <span className="block font-semibold mb-1">
                    {msg.role === "user" ? "You" : "Twin"}
                  </span>
                  <span>{msg.content}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="flex gap-2 px-6 py-4 border-t bg-white bg-opacity-80">
          <input
            className="border p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message and press ENTER"
            onKeyDown={e => { if (e.key === "Enter") sendMessage(); }}
          />
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}