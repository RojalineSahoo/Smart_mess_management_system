import MealEntry from "../models/MealEntry.js";
import Menu from "../models/Menu.js";
import { getUtcMidnight, getTomorrowUtcMidnight } from "../utils/dateUtils.js";

// 1. GET TOMORROW STATUS
export const getTomorrowMealStatus = async (req, res, next) => {
  try {
    const targetDate = getTomorrowUtcMidnight();
    const now = new Date();
    // Add 5.5 hours to UTC to get India Time
    const nowIndia = new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000));
    const isLocked = nowIndia.getHours() > 22 || (nowIndia.getHours() === 22 && nowIndia.getMinutes() >= 30);
    
    const entry = await MealEntry.findOne({ userId: req.user._id, date: targetDate });
    res.status(200).json({
      status: entry ? entry.status : "NOT_APPLIED",
      locked: isLocked
    });
  } catch (error) { next(error); }
};

// 2. APPLY FOR TOMORROW
export const applyTomorrowMeal = async (req, res, next) => {
  try {
    const now = new Date();
    if (now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() >= 30)) {
      return res.status(403).json({ message: "Changes closed after 10:30 PM" });
    }
    const targetDate = getTomorrowUtcMidnight();
    await MealEntry.findOneAndUpdate(
      { userId: req.user._id, date: targetDate },
      { status: "APPLIED" },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, message: "Applied successfully" });
  } catch (error) { next(error); }
};

// 3. CANCEL FOR TOMORROW
export const cancelTomorrowMeal = async (req, res, next) => {
  try {
    const now = new Date();
    if (now.getHours() > 22 || (now.getHours() === 22 && now.getMinutes() >= 30)) {
      return res.status(403).json({ message: "Changes closed after 10:30 PM" });
    }
    const targetDate = getTomorrowUtcMidnight();
    await MealEntry.findOneAndUpdate(
      { userId: req.user._id, date: targetDate },
      { status: "CANCELLED" },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, message: "Cancelled successfully" });
  } catch (error) { next(error); }
};

// 4. GET TODAY'S MENU (Used by Dashboard)
export const getTodayMenu = async (req, res, next) => {
  try {
    const startOfToday = getUtcMidnight();
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(endOfToday.getDate() + 1);

    const menu = await Menu.findOne({
      date: { $gte: startOfToday, $lt: endOfToday },
    });

    res.status(200).json({
      success: true,
      menu: menu || null,
    });
  } catch (error) { next(error); }
};

// 5. GET MONTHLY SUMMARY
export const getMonthlyMealSummary = async (req, res, next) => {
  try {
    const { month } = req.query;
    if (!month) return res.status(400).json({ message: "Month required" });
    const [year, monthNum] = month.split("-").map(Number);
    const startDate = new Date(Date.UTC(year, monthNum - 1, 1));
    const endDate = new Date(Date.UTC(year, monthNum, 1));

    const meals = await MealEntry.find({
      userId: req.user._id,
      date: { $gte: startDate, $lt: endDate },
      status: "APPLIED"
    });

    res.status(200).json({
      success: true,
      studentName: req.user.name,
      summary: {
        totalMeals: meals.length,
        estimatedBill: meals.length * 50
      }
    });
  } catch (error) { next(error); }
};