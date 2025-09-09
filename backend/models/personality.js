import mongoose from "mongoose";

const personalitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  hobbies: [String],
  favoriteFood: String,
  qualities: [String],
  tone: { type: String, default: "neutral" }
});

export default mongoose.model("Personality", personalitySchema);
