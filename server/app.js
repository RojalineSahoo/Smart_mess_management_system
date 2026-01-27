import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 🔐 ENABLE CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-mess-management-system-lovat.vercel.app",
      "https://smart-mess-management-system-dm02hb30w-rojaline-sahoos-projects.vercel.app"
    ],
    credentials: true,
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
