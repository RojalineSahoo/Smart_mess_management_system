import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getTomorrowMealCount } from "../controllers/adminMealController.js";
import { uploadMenuForDate } from "../controllers/menuController.js";
import { createNotice } from "../controllers/noticeController.js";


const router = express.Router();

// Get tomorrow's meal count (admin only)
router.get(
  "/meals/tomorrow/count",
  authMiddleware,
  roleMiddleware("admin"),
  getTomorrowMealCount
);

export default router;

// Upload menu for a specific date (admin only)
router.post(
  "/menu",
  authMiddleware,
  roleMiddleware("admin"),
  uploadMenuForDate
);

router.post(
  "/notices",
  authMiddleware,
  roleMiddleware("admin"),
  createNotice
);




