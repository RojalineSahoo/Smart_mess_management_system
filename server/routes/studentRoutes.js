import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


import {
  applyTomorrowMeal,
  cancelTomorrowMeal,
  getTomorrowMealStatus,
  getMonthlyMealSummary,
  getTodayMenu,
  getTomorrowMenu // ✅ Added this import
} from "../controllers/studentMealController.js";

import { getActiveNotices } from "../controllers/noticeController.js";

const router = express.Router();

// Apply middleware to all student routes
router.use(protect);
router.use(roleMiddleware("student"));

// Meals
router.post("/meals/apply", applyTomorrowMeal);
router.post("/meals/cancel", cancelTomorrowMeal);
router.get("/meals/tomorrow/status", getTomorrowMealStatus);
router.get("/meals/summary", getMonthlyMealSummary);

// Menu
router.get("/menu/today", getTodayMenu); 
router.get("/menu/tomorrow", getTomorrowMenu);

// Notices
router.get("/notices", getActiveNotices);

export default router;