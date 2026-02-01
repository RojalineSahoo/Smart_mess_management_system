import MealEntry from "../models/MealEntry.js";
import {
  getIstMidnight,
  getIstTomorrowMidnight
} from "../utils/dateUtils.js";

/**
 * TOMORROW'S HEADCOUNT (ADMIN)
 * Uses IST-based tomorrow so all students fall under ONE date
 */
export const getTomorrowMealCount = async (req, res, next) => {
  console.log("🔥 ADMIN MEAL CONTROLLER LOADED - IST VERSION");
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const targetDate = getIstTomorrowMidnight();

    const count = await MealEntry.countDocuments({
      date: targetDate,
      status: "APPLIED",
    });

    const now = new Date();
    const isFinal =
      now.getHours() > 22 ||
      (now.getHours() === 22 && now.getMinutes() >= 30);

    res.status(200).json({
      date: targetDate.toISOString().split("T")[0],
      count,
      status: isFinal ? "FINAL" : "TENTATIVE",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * TODAY'S HEADCOUNT (ADMIN)
 * Uses IST-based today so dashboard switches at 12:00 AM IST
 */
export const getTodayMealCount = async (req, res, next) => {
   console.log("🔥 ADMIN TODAY COUNT - IST LOGIC RUNNING");
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const todayDate = getIstMidnight();

    const count = await MealEntry.countDocuments({
      date: todayDate,
      status: "APPLIED",
    });

    res.status(200).json({
      date: todayDate.toISOString().split("T")[0],
      count,
    });
  } catch (error) {
    next(error);
  }
};