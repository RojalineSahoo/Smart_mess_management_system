import MealEntry from "../models/MealEntry.js";

export const getTomorrowMealCount = async (req, res, next) => {
  try {
    const user = req.user;

    // Role check
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Resolve tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // Count applied meals
    const count = await MealEntry.countDocuments({
      date: tomorrow,
      status: "APPLIED"
    });

    // Determine tentative or final
    const now = new Date();
    const cutoffHour = 22;
    const cutoffMinute = 30;

    const isFinal =
      now.getHours() > cutoffHour ||
      (now.getHours() === cutoffHour && now.getMinutes() >= cutoffMinute);

    return res.status(200).json({
      date: tomorrow.toISOString().split("T")[0],
      count,
      status: isFinal ? "FINAL" : "TENTATIVE"
    });
  } catch (error) {
    next(error);
  }
};

export const getTodayMealCount = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const count = await MealEntry.countDocuments({
    date: today,
    status: "APPLIED"
  });

  res.json({
    date: today.toISOString().split("T")[0],
    count
  });
};

