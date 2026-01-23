import MealEntry from "../models/MealEntry.js";

// Student Meal Controller
// Handles meal-related actions for students

export const getTodayMealStatus = async (req, res, next) => {
  try {
    // logic will be added later
    res.status(200).json({ message: "Today meal status endpoint" });
  } catch (error) {
    next(error);
  }
};

export const getTomorrowMealStatus = async (req, res, next) => {
  try {
    // logic will be added later
    res.status(200).json({ message: "Tomorrow meal status endpoint" });
  } catch (error) {
    next(error);
  }
};

/*export const applyTomorrowMeal = async (req, res, next) => {
  try {
    // core apply logic will be added here
    res.status(200).json({ message: "Apply tomorrow meal endpoint" });
  } catch (error) {
    next(error);
  }
};*/
export const applyTomorrowMeal = async (req, res, next) => {
  try {
    const user = req.user;

    // 1. Role check
    if (user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2. Cutoff check (server time)
    const now = new Date();
    const cutoffHour = 22;
    const cutoffMinute = 30;

    if (
      now.getHours() > cutoffHour ||
      (now.getHours() === cutoffHour && now.getMinutes() >= cutoffMinute)
    ) {
      return res
        .status(403)
        .json({ message: "Meal application closed for tomorrow" });
    }

    // 3. Resolve tomorrow date (normalized)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // 4. Check existing entry
    let entry = await MealEntry.findOne({
      userId: user.id,
      date: tomorrow
    });

    // 5. Locked check
    if (entry && entry.locked) {
      return res.status(403).json({ message: "Meal entry is locked" });
    }

    // 6. Create or update entry
    if (!entry) {
      entry = new MealEntry({
        userId: user.id,
        date: tomorrow,
        status: "APPLIED",
        locked: false
      });
    } else {
      entry.status = "APPLIED";
    }

    await entry.save();

    return res.status(200).json({
      message: "Meal applied for tomorrow",
      status: entry.status
    });
  } catch (error) {
    next(error);
  }
};



export const cancelTomorrowMeal = async (req, res, next) => {
  try {
    // core cancel logic will be added here
    res.status(200).json({ message: "Cancel tomorrow meal endpoint" });
  } catch (error) {
    next(error);
  }
};
