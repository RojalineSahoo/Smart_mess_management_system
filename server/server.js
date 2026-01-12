import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";

// Load Environment Variables
dotenv.config();

// Connect to local MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this backend
app.use(express.json()); // Allows server to parse JSON data sent from the frontend

// API Endpoints
app.use("/api/auth", authRoutes);       // Login and Registration
app.use("/api/meals", mealRoutes);     // Student Meal Applications
app.use("/api/admin", adminRoutes);     // Admin Live Counts and Stats
app.use("/api/notices", noticeRoutes); // Mess Notice Board

// Global Error Handler (Resume-worthy touch for production standard)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Smart Mess Server running on port ${PORT}`));