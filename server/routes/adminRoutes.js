import express from "express";
import { addMenu, addNotice } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/menu", protect, adminOnly, addMenu);
router.post("/notice", protect, adminOnly, addNotice);

export default router;
