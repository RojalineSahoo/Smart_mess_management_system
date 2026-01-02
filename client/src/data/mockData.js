export const MOCK_DATA = {
  student: {
    name: "Priya Sharma",
    rollNo: "21BCE1002",
    branch: "Computer Science Eng.",
    year: "3rd Year",
    room: "B-205",
    mealsSkipped: 7,
    preference: "Vegetarian",
    consumptionTrend: [
      { month: "Jan", value: 30 },
      { month: "Feb", value: 25 },
      { month: "Mar", value: 42 },
      { month: "Apr", value: 40 },
      { month: "May", value: 35 },
    ]
  },
  notices: [
    { 
      title: "Mess menu for next week has been published. Check out the 'Weekly Menu' page!", 
      date: "Nov 1, 2023, 10:00 AM" 
    },
    { 
      title: "Kindly provide your feedback on the new meal items introduced last week.", 
      date: "Oct 31, 2023, 03:30 PM" 
    },
    { 
      title: "Important: Changes in dinner timings for tomorrow, 2nd November.", 
      date: "Nov 1, 2023, 08:00 PM" 
    }
  ],
  weeklyMenu: [
    {
      day: "Monday",
      date: "June 10, 2024",
      breakfast: "Poha, Boiled Egg, Tea/Coffee",
      lunch: "Dal Fry, Rice, Roti, Mixed Veg Curry, Salad",
      dinner: "Chicken Curry / Paneer Butter Masala, Rice, Roti, Kheer"
    },
    {
      day: "Tuesday",
      date: "June 11, 2024",
      breakfast: "Idli, Sambar, Chutney, Tea/Coffee",
      lunch: "Rajma, Jeera Rice, Roti, Aloo Gobhi, Pickle",
      dinner: "Egg Bhurji / Soy Chilli, Noodles, Salad"
    }
    // Add other days following your screenshot content
  ]
};