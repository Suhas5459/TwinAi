import express from "express";
import Personality from "../models/personality.js";  // ✅ Your schema
import User from "../models/User.js";

const router = express.Router();

// ------------------- POST: Save or Update Personality -------------------
router.post("/", async (req, res) => {
  try {
    const { userId, hobbies, favoriteFood, qualities, tone } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create or update personality
    let personality = await Personality.findOne({ user: userId });

    if (personality) {
      // Update existing personality
      personality.hobbies = hobbies;
      personality.favoriteFood = favoriteFood;
      personality.qualities = qualities;
      personality.tone = tone;
      await personality.save();
    } else {
      // Create new personality
      personality = new Personality({
        user: userId,
        hobbies,
        favoriteFood,
        qualities,
        tone,
      });
      await personality.save();
    }

    res.status(201).json({ success: true, message: "Personality saved successfully",
       userId: userId,
     });
  } catch (error) {
    console.error("Personality Save Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------- GET: Fetch Personality -------------------
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query; // pass userId in query params

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const personality = await Personality.findOne({ user: userId });

    if (!personality) {
      return res.status(404).json({ success: false, message: "No personality found" });
    }

    res.status(200).json(personality);
  } catch (error) {
    console.error("Personality Fetch Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
