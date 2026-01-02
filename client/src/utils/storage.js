// Initial Data if LocalStorage is empty
const defaultNotices = [
  { id: 1, title: "Sunday Special", content: "Biryani will be served this Sunday!", date: "2026-01-02" },
  { id: 2, title: "Mess Off Deadline", content: "Submit mess off requests by 8 PM daily.", date: "2026-01-01" }
];

export const db = {
  // Notices Logic
  getNotices: () => {
    const data = localStorage.getItem('mess_notices');
    return data ? JSON.parse(data) : defaultNotices;
  },
  
  addNotice: (notice) => {
    const notices = db.getNotices();
    const newNotice = { ...notice, id: Date.now(), date: new Date().toLocaleDateString() };
    const updated = [newNotice, ...notices];
    localStorage.setItem('mess_notices', JSON.stringify(updated));
    return updated;
  },

  // Student Attendance Logic
  getAttendance: () => {
    const data = localStorage.getItem('mess_attendance');
    return data ? JSON.parse(data) : {};
  },

  toggleMeal: (date, mealType) => {
    const attendance = db.getAttendance();
    const key = `${date}-${mealType}`;
    attendance[key] = !attendance[key]; // Toggle skip/eat
    localStorage.setItem('mess_attendance', JSON.stringify(attendance));
    return attendance;
  }
};