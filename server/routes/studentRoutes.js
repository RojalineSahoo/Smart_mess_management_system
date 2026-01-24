import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  applyTomorrowMeal,
  cancelTomorrowMeal,
  getTomorrowMealStatus,
  getMonthlyMealSummary
} from "../controllers/studentMealController.js";
import { getMenuByDate } from "../controllers/menuController.js";
import { getActiveNotices } from "../controllers/noticeController.js";

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

// Get active notices (student read-only)
router.get(
  "/notices",
  authMiddleware,
  roleMiddleware("student"),
  getActiveNotices
);

// Get monthly meal summary (student read-only)
router.get(
  "/meals/summary",
  authMiddleware,
  roleMiddleware("student"),
  getMonthlyMealSummary
);


