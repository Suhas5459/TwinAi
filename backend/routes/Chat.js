import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Personality from "../models/personality.js";

dotenv.config(); // ✅ load .env here

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/chat", async (req, res) => {
  try {
    const { userId, message } = req.body;

    // 🔹 Fetch personality from DB
    const personality = await Personality.findOne({ user: userId });

    let systemPrompt = "You are a helpful AI twin.";
    if (personality) {
      systemPrompt = `You are the user's twin. Personality:
      - Hobbies: ${personality.hobbies.join(", ")}
      - Favorite Food: ${personality.favoriteFood}
      - Qualities: ${personality.qualities.join(", ")}
      - Tone: ${personality.tone}`;
    }

    // 🔹 Combine system prompt and user message
    const prompt = `${systemPrompt}\nUser: ${message}\nTwin:`;

    // 🔹 Ask Gemini
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ reply: "Server error, please try again." });
  }
});

export default router;
