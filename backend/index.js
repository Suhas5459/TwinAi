import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';
import authRoutes from "./routes/Auth.js";
import personality from './routes/Personality.js';
import chatRoutes from './routes/Chat.js'; // lowercase file name
// You don't need separate registerRoutes if authRoutes handles it

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000; // use 5000 for backend

app.use(cors());
app.use(express.json()); // <- IMPORTANT! parses JSON body from frontend

// ✅ Use your routes
app.use("/api/auth", authRoutes);
app.use('/api/personality' , personality)
app.use("/api", chatRoutes); // all auth routes go here

app.get('/', (req, res) => {
  res.send('Backend is working 🚀');
});

app.listen(port, () => {
  console.log(`✅ twinai backend running on port ${port}`);
});
