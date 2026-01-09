import React from 'react';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { db } from "../utils/storage";
import "../styles/menu.css";

const WeeklyMenu = () => {
  const weeklyMenu = db.getWeeklyMenu();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Weekly Mess Menu" />
        
        <div className="weekly-menu-grid">
          {days.map((day) => (
            <div key={day} className="menu-card">
              <div className="day-header">
                <h3>{day}</h3>
              </div>
              <div className="day-content">
                <div className="meal-slot">
                  <span className="meal-label breakfast">Breakfast</span>
                  <p>{weeklyMenu[day]?.breakfast || "Not Updated"}</p>
                </div>
                <div className="meal-slot">
                  <span className="meal-label lunch">Lunch</span>
                  <p>{weeklyMenu[day]?.lunch || "Not Updated"}</p>
                </div>
                <div className="meal-slot">
                  <span className="meal-label dinner">Dinner</span>
                  <p>{weeklyMenu[day]?.dinner || "Not Updated"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WeeklyMenu;