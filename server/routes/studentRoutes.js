import express from "express";
import { protect } from "../middleware/authMiddleware.js";
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
  protect,
  roleMiddleware("student"),
  applyTomorrowMeal
);

// Cancel tomorrow's meal
router.post(
  "/meals/cancel",
  protect,
  roleMiddleware("student"),
  cancelTomorrowMeal
);

// Get tomorrow meal status
router.get(
  "/meals/tomorrow/status",
  protect,
  roleMiddleware("student"),
  getTomorrowMealStatus
);

// View menu
router.get(
  "/menu",
  protect,
  roleMiddleware("student"),
  getMenuByDate
);

// Get active notices
router.get(
  "/notices",
  protect,
  roleMiddleware("student"),
  getActiveNotices
);

// Get monthly meal summary
router.get(
  "/meals/summary",
  protect,
  roleMiddleware("student"),
  getMonthlyMealSummary
);

export default router;
