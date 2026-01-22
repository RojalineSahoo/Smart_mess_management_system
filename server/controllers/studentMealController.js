import Attendance from "../models/Attendance.js";
import { isTimeLocked } from "../utils/timeLock.js"; // Use your existing utility

// 1. Student Applying for a Meal
export const applyForMeal = async (req, res) => {
  try {
    const { date, mealType } = req.body;
    const studentId = req.user.id; // From your authMiddleware

    // ENFORCE SMART LOGIC: Check if the deadline has passed
    if (isTimeLocked(date, mealType)) {
      return res.status(400).json({ 
        message: `Too late to apply/cancel ${mealType} for this date.` 
      });
    }

    // Update or Create: Upsert logic ensures no duplicates
    const application = await Attendance.findOneAndUpdate(
      { studentId, date, mealType },
      { status: "Applied" },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Meal application successful!", application });
  } catch (error) {
    res.status(500).json({ message: "Error processing meal application", error });
  }
};

// 2. Admin Live Counter Logic
export const getLiveCounts = async (req, res) => {
  try {
    const { date } = req.query; // Admin selects a date to view stats

    // Aggregation Pipeline: This is highly valued by ATS for "Data Processing" skills
    const stats = await Attendance.aggregate([
      { $match: { date: date, status: "Applied" } },
      { $group: { _id: "$mealType", count: { $sum: 1 } } }
    ]);

    // Format the response for your Admin Dashboard UI
    const formattedStats = {
      Breakfast: stats.find(s => s._id === "Breakfast")?.count || 0,
      Lunch: stats.find(s => s._id === "Lunch")?.count || 0,
      Dinner: stats.find(s => s._id === "Dinner")?.count || 0,
    };

    res.status(200).json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching live counts", error });
  }
};