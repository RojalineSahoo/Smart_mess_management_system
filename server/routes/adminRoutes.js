import express from "express";
import { getLiveCounts } from "../controllers/mealController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged-in Admins can see live stats
router.get("/live-stats", protect, adminOnly, getLiveCounts);

export default router;