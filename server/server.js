import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // 👈 Add this
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // Don't forget admin!

const app = express();

// 1. Database Connection
connectDB();

// 2. Middleware
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://smart-mess-management-system-mb1g.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(cookieParser()); // 👈 Critical for reading the JWT token

// 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes); 
app.use("/api/admin", adminRoutes); 

app.get("/", (req, res) => {
  res.send("Smart Mess Management System API is running...");
});

// 4. Global Error Handler (Prevents server from crashing on errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});