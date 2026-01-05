import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NoticeBoard from "../components/NoticeBoard";
import { db } from '../utils/storage';
import { useAuth } from "../context/AuthContext";
import { MOCK_DATA } from "../data/mockData";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch notices from LocalStorage on page load
    const latestNotices = db.getNotices();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotices(latestNotices);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar role={user?.role || "student"} />
      <main className="dashboard-main">
        <Navbar pageTitle="Student Dashboard" />
        
        <div className="main-content">
          <div className="dashboard-content">
            <NoticeBoard notices={notices} />

            <section className="meal-section">
              <h3 className="section-title">Today's Menu</h3>
              <div className="menu-card-container">
                {/* Breakfast Card */}
                <div className="visual-menu-card breakfast-theme">
                  <div className="menu-card-header">
                    <span className="menu-emoji">🍳</span>
                    <h4>Breakfast</h4>
                  </div>
                  <p className="menu-details">Poha, Boiled Egg, Tea/Coffee</p>
                </div>

                {/* Lunch Card */}
                <div className="visual-menu-card lunch-theme">
                  <div className="menu-card-header">
                    <span className="menu-emoji">🍛</span>
                    <h4>Lunch</h4>
                  </div>
                  <p className="menu-details">Dal Fry, Rice, Roti, Mixed Veg Curry, Salad</p>
                </div>

                {/* Dinner Card */}
                <div className="visual-menu-card dinner-theme">
                  <div className="menu-card-header">
                    <span className="menu-emoji">🍲</span>
                    <h4>Dinner</h4>
                  </div>
                  <p className="menu-details">Chicken Curry / Paneer Butter Masala, Rice, Roti, Kheer</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;