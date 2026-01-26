import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import { getTomorrowMealCount } from "../controllers/adminMealController.js";
import { uploadMenuForDate } from "../controllers/menuController.js";
import { createNotice } from "../controllers/noticeController.js";
import { getTodayMealCount } from "../controllers/adminMealController.js";

const router = express.Router();

// Get tomorrow's meal count (admin only)
router.get(
  "/meals/today/count",
  protect,
  roleMiddleware("admin"),
  getTodayMealCount
);

router.get(
  "/meals/tomorrow/count",
  protect,
  roleMiddleware("admin"),
  getTomorrowMealCount
);

// Upload menu for a specific date (admin only)
router.post(
  "/menu",
  protect,
  roleMiddleware("admin"),
  uploadMenuForDate
);

// Create notice (admin only)
router.post(
  "/notices",
  protect,
  roleMiddleware("admin"),
  createNotice
);

export default router;
