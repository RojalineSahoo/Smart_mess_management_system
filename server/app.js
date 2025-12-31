import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});
import { protect } from "./middleware/authMiddleware.js";

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Token is valid",
    user: req.user
  });
});

import mealRoutes from "./routes/mealRoutes.js";

app.use("/api/meals", mealRoutes);

export default app;
