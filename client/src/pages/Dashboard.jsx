import React from "react";
import Sidebar from "../components/Sidebar";     // Corrected: go up one level
import Navbar from "../components/Navbar";       // Corrected: go up one level
import NoticeBoard from "../components/NoticeBoard"; // Corrected: go up one level
import { MOCK_DATA } from "../data/mockData";    // Also check this path!
import "../styles/dashboard.css";                // Ensure this is correct too
const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Student Dashboard" />
        
        <div className="dashboard-content">
          <NoticeBoard notices={MOCK_DATA.notices} />

          <section className="meal-section">
            <h3 className="section-title">Today's Menu</h3>
            <div className="today-grid">
              <div className="today-card">
                <h4>Breakfast</h4>
                <p>{MOCK_DATA.weeklyMenu[0].breakfast}</p>
              </div>
              <div className="today-card">
                <h4>Lunch</h4>
                <p>{MOCK_DATA.weeklyMenu[0].lunch}</p>
              </div>
              <div className="today-card">
                <h4>Dinner</h4>
                <p>{MOCK_DATA.weeklyMenu[0].dinner}</p>
              </div>
            </div>
          </section>

          <section className="planner-section">
             <h3 className="section-title">Tomorrow's Meal Planner</h3>
             <div className="planner-card">
                <p className="planner-note">Adjust your meal preferences for tomorrow. Changes are locked 24 hours before.</p>
                {/* Add Switch/Toggle components here */}
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;