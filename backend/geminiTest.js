import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const run = async () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Hello Gemini!");
    console.log("Gemini Response:", result.response.text());
  } catch (err) {
    console.error("Gemini Test Error:", err);
  }
};

run();
