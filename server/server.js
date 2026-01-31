import dotenv from "dotenv";
// 1. Load environment variables immediately
dotenv.config(); 

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// 2. Initialize the App
const app = express();

// 3. Connect to Database
// Note: Ensure your config/db.js uses the timeout logic we discussed to prevent hanging
connectDB();

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. Routes
app.use("/api/auth", authRoutes);

// Root route for testing
app.get("/", (req, res) => {
  res.send("Smart Mess Management System API is running...");
});

// 6. Start Server 
// This part keeps the process from "Clean Exiting"
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`✅ Press Ctrl+C to stop`);
});