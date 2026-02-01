import MealEntry from "../models/MealEntry.js";
import { getUtcMidnight, getTomorrowUtcMidnight } from "../utils/dateUtils.js";

// TOMORROW'S HEADCOUNT
export const getTomorrowMealCount = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

    const targetDate = getTomorrowUtcMidnight();

    const count = await MealEntry.countDocuments({
      date: targetDate,
      status: "APPLIED"
    });

    const now = new Date();
    const isFinal = now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() >= 30);

    res.status(200).json({
      date: targetDate.toISOString().split("T")[0],
      count,
      status: isFinal ? "FINAL" : "TENTATIVE"
    });
  } catch (error) { next(error); }
};

// TODAY'S HEADCOUNT (What is being cooked now)
export const getTodayMealCount = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" });

    const today = getUtcMidnight();

    const count = await MealEntry.countDocuments({
      date: today,
      status: "APPLIED"
    });

    res.status(200).json({
      date: today.toISOString().split("T")[0],
      count
    });
  } catch (error) { next(error); }
};