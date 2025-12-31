import Attendance from "../models/Attendance.js";
import { isLocked } from "../utils/timeLock.js";

export const updateMeal = async (req, res) => {
  const { mealTime, user_id, meal_type, is_skipped, preference } = req.body;

  if (isLocked(mealTime)) {
    return res.status(403).json({ msg: "Meal locked 24 hours before" });
  }

  await Attendance.create({
    user_id,
    date: mealTime.split("T")[0],
    meal_type,
    is_skipped,
    preference
  });

  res.json({ msg: "Meal updated successfully" });
};
