import express from "express";
import { updateMeal } from "../controllers/mealController.js";
const router = express.Router();

router.post("/update", updateMeal);
export default router;
