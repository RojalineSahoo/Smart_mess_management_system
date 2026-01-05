import React from 'react';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

const Profile = () => {
  const user = {
    name: "Priya Sharma",
    rollNo: "21BCE1002",
    branch: "Computer Science Eng.",
    year: "3rd Year",
    room: "B-205",
    mealsSkipped: 7,
    preference: "Vegetarian"
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Student Profile" />
        
        <div className="profile-content">
          {/* Personal Details Section */}
          <section className="profile-card">
            <div className="section-header">
              <h3 className="section-title">Personal Details</h3>
              <button className="profile-edit-btn">✎ Edit</button>
            </div>
            
            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Name</span>
                <p className="value">{user.name}</p>
              </div>
              <div className="detail-item">
                <span className="label">Roll Number</span>
                <p className="value">{user.rollNo}</p>
              </div>
              <div className="detail-item">
                <span className="label">Branch</span>
                <p className="value">{user.branch}</p>
              </div>
              <div className="detail-item">
                <span className="label">Year</span>
                <p className="value">{user.year}</p>
              </div>
              <div className="detail-item">
                <span className="label">Room Number</span>
                <p className="value">{user.room}</p>
              </div>
            </div>
          </section>

          {/* Accountability Metrics Section */}
          <section className="profile-card">
            <div className="section-header">
              <h3 className="section-title">Accountability Metrics</h3>
            </div>
            
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="label">Total Meals Skipped</span>
                <h2 className="metrics-value">{user.mealsSkipped}</h2>
              </div>
              
              <div className="metric-item">
                <span className="label">Dietary Preference</span>
                <div className="badge-container">
                  <span className="badge-green">{user.preference}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;