import { useState } from "react";
import axios from "axios";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = localStorage.getItem("userId"); // ✅ get from storage

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
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
    <div className="p-4 max-w-md mx-auto">
      <div className="border rounded p-3 h-96 overflow-y-auto mb-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === "user" ? "text-blue-600" : "text-green-600"
            }`}
          >
            <b>{msg.role === "user" ? "You" : "Twin"}:</b> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />
        <button className="bg-blue-500 text-white px-4" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
