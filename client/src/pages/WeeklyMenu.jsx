import React from "react";
import Sidebar from "../components/Sidebar";    // Change from ../../ to ../
import Navbar from "../components/Navbar";      // Change from ../../ to ../
import MealCard from "../components/MealCard";  // Change from ../../ to ../
import { MOCK_DATA } from "../data/mockData";   // Change from ../../ to ../
import "../styles/menu.css";                   // Ensure this points to ../styles/

const WeeklyMenu = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Weekly Menu" />
        
        <div className="menu-container">
          <div className="menu-header">
            <h2 className="menu-title">Weekly Menu</h2>
            <p className="menu-subtitle">View the fixed meal rotation for the entire week.</p>
          </div>

          <div className="menu-grid">
            {MOCK_DATA.weeklyMenu.map((item, index) => (
              <MealCard 
                key={index}
                day={item.day}
                date={item.date}
                breakfast={item.breakfast}
                lunch={item.lunch}
                dinner={item.dinner}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WeeklyMenu;