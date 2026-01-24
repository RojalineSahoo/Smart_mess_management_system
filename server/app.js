import express from "express";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/student", studentRoutes);

app.get("/", (req, res) => {
  res.send("Smart Mess Management System API is running");
});

export default app;
