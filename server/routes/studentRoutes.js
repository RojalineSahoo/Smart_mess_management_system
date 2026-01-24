import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  applyTomorrowMeal,
  cancelTomorrowMeal,
  getTomorrowMealStatus
} from "../controllers/studentMealController.js";
import { getMenuByDate } from "../controllers/menuController.js";

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

// Get tomorrow meal status (read-only)
router.get(
  "/meals/tomorrow/status",
  authMiddleware,
  roleMiddleware("student"),
  getTomorrowMealStatus
);
export default router;

// View menu by date (student read-only)
router.get(
  "/menu",
  authMiddleware,
  roleMiddleware("student"),
  getMenuByDate
);

