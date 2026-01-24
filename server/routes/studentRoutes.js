import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  applyTomorrowMeal,
  cancelTomorrowMeal
} from "../controllers/studentMealController.js";

const router = express.Router();

// Apply for tomorrow's meal
router.post(
  "/meals/apply",
  authMiddleware,
  roleMiddleware("student"),
  applyTomorrowMeal
);

// Cancel tomorrow's meal
router.post(
  "/meals/cancel",
  authMiddleware,
  roleMiddleware("student"),
  cancelTomorrowMeal
);

export default router;
