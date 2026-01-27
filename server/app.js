import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 🔐 ENABLE CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Smart Mess Management System API is running");
});


export default app;
