/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NoticeBoard from "../components/NoticeBoard";
import { db } from '../utils/storage';
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [menus, setMenus] = useState({ today: {}, tomorrow: {} });
  const [tomorrowAttendance, setTomorrowAttendance] = useState([]);

  const todayDateObj = new Date();
  const tomorrowDateObj = new Date();
  tomorrowDateObj.setDate(todayDateObj.getDate() + 1);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const tomorrowStr = tomorrowDateObj.toLocaleDateString('en-CA');

  useEffect(() => {
    setNotices(db.getNotices());
    const fullWeeklyMenu = db.getWeeklyMenu();
    
    setMenus({
      today: fullWeeklyMenu[days[todayDateObj.getDay()]] || {},
      tomorrow: fullWeeklyMenu[days[tomorrowDateObj.getDay()]] || {}
    });

    const savedTomorrow = JSON.parse(localStorage.getItem(`attendance_${tomorrowStr}`)) || [];
    setTomorrowAttendance(savedTomorrow);
  }, []);

  const handleToggleTomorrow = (mealType) => {
    const isConfirmed = tomorrowAttendance.find(a => a.id === user?.id && a.meal === mealType);
    if (isConfirmed) {
      const updated = db.removeAttendance(user.id, mealType, tomorrowStr);
      setTomorrowAttendance(updated);
    } else {
      const updated = db.markAttendance(user.id, mealType, tomorrowStr);
      setTomorrowAttendance(updated);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Meal Planning" />
        
        <div className="main-content">
          <div className="dashboard-content">
            {/* Notice Board */}
            <NoticeBoard notices={notices} />

            {/* SECTION: TODAY'S MENU (LOCKED) */}
            <section className="meal-section">
              <h3 className="section-title">Today's Menu (Locked)</h3>
              <div className="menu-card-container">
                <div className="visual-menu-card breakfast-theme">
                  <div className="menu-card-header"><span className="menu-emoji">🍳</span><h4>Breakfast</h4></div>
                  <p className="menu-details">{menus.today.breakfast}</p>
                  <div className="locked-status">🔒 Locked</div>
                </div>
                <div className="visual-menu-card lunch-theme">
                  <div className="menu-card-header"><span className="menu-emoji">🍛</span><h4>Lunch</h4></div>
                  <p className="menu-details">{menus.today.lunch}</p>
                  <div className="locked-status">🔒 Locked</div>
                </div>
                <div className="visual-menu-card dinner-theme">
                  <div className="menu-card-header"><span className="menu-emoji">🍲</span><h4>Dinner</h4></div>
                  <p className="menu-details">{menus.today.dinner}</p>
                  <div className="locked-status">🔒 Locked</div>
                </div>
              </div>
            </section>

            {/* SECTION: TOMORROW'S PLAN (ACTIONABLE) */}
            <section className="meal-section" style={{ marginTop: '30px' }}>
              <h3 className="section-title">Tomorrow's Plan ({days[tomorrowDateObj.getDay()]})</h3>
              <div className="menu-card-container">
                {['Breakfast', 'Lunch', 'Dinner'].map((meal) => {
                  const mealKey = meal.toLowerCase();
                  const isConfirmed = tomorrowAttendance.find(a => a.id === user?.id && a.meal === meal);
                  return (
                    <div key={meal} className={`visual-menu-card ${mealKey}-theme`}>
                      <div className="menu-card-header">
                        <span className="menu-emoji">{meal === 'Breakfast' ? '🍳' : meal === 'Lunch' ? '🍛' : '🍲'}</span>
                        <h4>{meal}</h4>
                      </div>
                      <p className="menu-details">{menus.tomorrow[mealKey]}</p>
                      <button 
                        onClick={() => handleToggleTomorrow(meal)}
                        className={isConfirmed ? "n-del-btn" : "save-btn"}
                        style={{ width: '100%', marginTop: '15px', borderRadius: '8px', padding: '10px' }}
                      >
                        {isConfirmed ? "Cancel Tomorrow" : "Confirm Tomorrow"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;