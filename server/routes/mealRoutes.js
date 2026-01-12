import express from "express";
import { applyForMeal } from "../controllers/mealController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student must be logged in to apply
router.post("/apply", protect, applyForMeal);

export default router;