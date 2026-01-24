import MealEntry from "../models/MealEntry.js";

// Student Meal Controller
// Handles meal-related actions for students

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



/*export const cancelTomorrowMeal = async (req, res, next) => {
  try {
    // core cancel logic will be added here
    res.status(200).json({ message: "Cancel tomorrow meal endpoint" });
  } catch (error) {
    next(error);
  }
};*/

export const cancelTomorrowMeal = async (req, res, next) => {
  try {
    const user = req.user;

    // 1. Role check
    if (user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2. Cutoff check
    const now = new Date();
    const cutoffHour = 22;
    const cutoffMinute = 30;

    if (
      now.getHours() > cutoffHour ||
      (now.getHours() === cutoffHour && now.getMinutes() >= cutoffMinute)
    ) {
      return res
        .status(403)
        .json({ message: "Meal cancellation closed for tomorrow" });
    }

    // 3. Resolve tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    // 4. Find existing entry
    const entry = await MealEntry.findOne({
      userId: user.id,
      date: tomorrow
    });

    if (!entry) {
      return res
        .status(404)
        .json({ message: "No meal application found for tomorrow" });
    }

    // 5. Locked check
    if (entry.locked) {
      return res.status(403).json({ message: "Meal entry is locked" });
    }

    // 6. Cancel meal
    entry.status = "CANCELLED";
    await entry.save();

    return res.status(200).json({
      message: "Meal cancelled for tomorrow",
      status: entry.status
    });
  } catch (error) {
    next(error);
  }
};

export const getTomorrowMealStatus = async (req, res, next) => {
  try {
    const user = req.user;

    // Role check
    if (user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Resolve tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const entry = await MealEntry.findOne({
      userId: user.id,
      date: tomorrow
    });

    // No record
    if (!entry) {
      return res.status(200).json({
        status: "NOT_APPLIED"
      });
    }

    // Existing record
    return res.status(200).json({
      status: entry.status
    });
  } catch (error) {
    next(error);
  }
};

