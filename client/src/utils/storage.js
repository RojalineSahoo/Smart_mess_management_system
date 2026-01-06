// storage.js

const defaultNotices = [
  { id: 1, title: "Sunday Special", date: "02 Jan", content: "Special Chicken Biryani and Paneer Butter Masala!" },
  { id: 2, title: "Mess Off Deadline", date: "01 Jan", content: "Submit applications by the 5th." }
];

const defaultWeeklyMenu = {
  Monday: { breakfast: "Poha, Egg", lunch: "Dal, Rice, Mix Veg", dinner: "Chicken/Paneer Curry" },
  Tuesday: { breakfast: "Idli, Sambar", lunch: "Chole Bhature", dinner: "Fish/Dal Fry" },
  Wednesday: { breakfast: "Upma", lunch: "Rajma Rice", dinner: "Egg Curry" },
  Thursday: { breakfast: "Puri Bhaji", lunch: "Kadhi Pakora", dinner: "Veg Pulao" },
  Friday: { breakfast: "Paratha", lunch: "Veg Thali", dinner: "Chicken Biryani" },
  Saturday: { breakfast: "Sandwich", lunch: "Pasta", dinner: "Fried Rice" },
  Sunday: { breakfast: "Sprouts", lunch: "Special Thali", dinner: "Light Soup/Khichdi" }
};

export const db = {
  // --- Notices ---
  getNotices: () => JSON.parse(localStorage.getItem('mess_notices')) || defaultNotices,
  addNotice: (notice) => {
    const notices = db.getNotices();
    const updated = [{ ...notice, id: Date.now(), date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) }, ...notices];
    localStorage.setItem('mess_notices', JSON.stringify(updated));
    return updated;
  },
  deleteNotice: (id) => {
    const updated = db.getNotices().filter(n => n.id !== id);
    localStorage.setItem('mess_notices', JSON.stringify(updated));
    return updated;
  },

  // --- Menu ---
  getWeeklyMenu: () => JSON.parse(localStorage.getItem('mess_weekly_menu')) || defaultWeeklyMenu,
  updateWeeklyMenu: (fullMenu) => {
    localStorage.setItem('mess_weekly_menu', JSON.stringify(fullMenu));
    return fullMenu;
  },

  // --- Attendance / Live Counts ---
  markAttendance: (studentId, mealType, targetDate) => {
    const key = `attendance_${targetDate}`;
    let attendance = JSON.parse(localStorage.getItem(key)) || [];
    if (!attendance.find(a => a.id === studentId && a.meal === mealType)) {
      attendance.push({ id: studentId, meal: mealType });
      localStorage.setItem(key, JSON.stringify(attendance));
    }
    return attendance;
  },
  removeAttendance: (studentId, mealType, targetDate) => {
    const key = `attendance_${targetDate}`;
    let attendance = JSON.parse(localStorage.getItem(key)) || [];
    const updated = attendance.filter(a => !(a.id === studentId && a.meal === mealType));
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  },
  getMealCounts: (targetDate) => {
    const attendance = JSON.parse(localStorage.getItem(`attendance_${targetDate}`)) || [];
    return {
      Breakfast: attendance.filter(a => a.meal === 'Breakfast').length,
      Lunch: attendance.filter(a => a.meal === 'Lunch').length,
      Dinner: attendance.filter(a => a.meal === 'Dinner').length,
      totalUsers: new Set(attendance.map(a => a.id)).size
    };
  }
};