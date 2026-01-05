// 1. Define Defaults First
const defaultNotices = [
  { 
    id: 1, 
    title: "Sunday Special", 
    date: "02 Jan", 
    content: "Special Chicken Biryani and Paneer Butter Masala will be served this Sunday for lunch!" 
  },
  { 
    id: 2, 
    title: "Mess Off Deadline", 
    date: "01 Jan", 
    content: "Please submit your mess-off applications by the 5th of every month to avoid being charged." 
  }
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

// 2. Export the Database Object
export const db = {
  // --- Notice Board Logic ---
  addNotice: (notice) => {
    const saved = localStorage.getItem('mess_notices');
    const notices = saved ? JSON.parse(saved) : defaultNotices;
    
    const newNotice = {
      ...notice, 
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    };

    const updatedNotices = [newNotice, ...notices];
    localStorage.setItem('mess_notices', JSON.stringify(updatedNotices));
    return updatedNotices;
  },

  getNotices: () => {
    const saved = localStorage.getItem('mess_notices');
    return saved ? JSON.parse(saved) : defaultNotices;
  },

  deleteNotice: (id) => {
    const saved = localStorage.getItem('mess_notices');
    if (!saved) return [];
    
    const notices = JSON.parse(saved);
    const updatedNotices = notices.filter(notice => notice.id !== id);
    
    localStorage.setItem('mess_notices', JSON.stringify(updatedNotices));
    return updatedNotices;
  },

  // --- Weekly Menu Logic ---
  getWeeklyMenu: () => {
    const saved = localStorage.getItem('mess_weekly_menu');
    return saved ? JSON.parse(saved) : defaultWeeklyMenu;
  },

  updateWeeklyMenu: (fullMenu) => {
    localStorage.setItem('mess_weekly_menu', JSON.stringify(fullMenu));
    return fullMenu;
  },

  updateMenu: (menuData) => {
    localStorage.setItem('mess_menu', JSON.stringify(menuData));
    return menuData;
  },

  getMenu: () => {
    const savedMenu = localStorage.getItem('mess_menu');
    return savedMenu ? JSON.parse(savedMenu) : null;
  },

  // --- NEW: Meal Attendance Logic ---
  markAttendance: (studentId, mealType) => {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    const key = `attendance_${today}`;
    const saved = localStorage.getItem(key);
    let attendance = saved ? JSON.parse(saved) : [];

    // Check if student already marked for this specific meal today
    const exists = attendance.find(a => a.id === studentId && a.meal === mealType);
    
    if (!exists) {
      attendance.push({ 
        id: studentId, 
        meal: mealType, 
        timestamp: new Date().toISOString() 
      });
      localStorage.setItem(key, JSON.stringify(attendance));
    }
    return attendance;
  },

  getMealCounts: () => {
    const today = new Date().toLocaleDateString('en-CA');
    const saved = localStorage.getItem(`attendance_${today}`);
    if (!saved) return { Breakfast: 0, Lunch: 0, Dinner: 0 };

    const attendance = JSON.parse(saved);
    return {
      Breakfast: attendance.filter(a => a.meal === 'Breakfast').length,
      Lunch: attendance.filter(a => a.meal === 'Lunch').length,
      Dinner: attendance.filter(a => a.meal === 'Dinner').length,
    };
  }
};