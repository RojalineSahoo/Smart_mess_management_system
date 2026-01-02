import React from "react";
import Sidebar from "../components/Sidebar";    // Change ../../ to ../
import Navbar from "../components/Navbar";      // Change ../../ to ../
import { MOCK_DATA } from "../data/mockData";   // Change ../../ to ../
import "../styles/profile.css";                 // Ensure this points to ../styles/

const Profile = () => {
  const { student } = MOCK_DATA;

  return (
    <div className="dashboard-layout">
      <Sidebar role="student" />
      <main className="dashboard-main">
        <Navbar pageTitle="Student Profile" />

        <div className="profile-content">
          {/* Personal Details Section */}
          <section className="profile-section card">
            <div className="section-header">
              <h3>Personal Details</h3>
              <button className="edit-icon-btn">✎</button>
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <label>Name:</label>
                <p>{student.name}</p>
              </div>
              <div className="detail-item">
                <label>Roll Number:</label>
                <p>{student.rollNo}</p>
              </div>
              <div className="detail-item">
                <label>Branch:</label>
                <p>{student.branch}</p>
              </div>
              <div className="detail-item">
                <label>Year:</label>
                <p>{student.year}</p>
              </div>
              <div className="detail-item">
                <label>Room Number:</label>
                <p>{student.room}</p>
              </div>
            </div>
          </section>

          {/* Accountability Metrics Section */}
          <section className="profile-section">
            <h3 className="sub-title">Accountability Metrics</h3>
            <div className="metrics-box card">
              <label>Total Meals Skipped:</label>
              <h2 className="metrics-value">{student.mealsSkipped}</h2>
              
              <div className="preference-box">
                <label>Current Dietary Preference:</label>
                <span className="badge-green">{student.preference}</span>
              </div>
            </div>
          </section>

          {/* Consumption Trend (The Bar Chart) */}
          <section className="profile-section">
            <h3 className="sub-title">Monthly Consumption Trend</h3>
            <div className="chart-container card">
              <div className="bar-chart">
                {student.consumptionTrend.map((data, index) => (
                  <div key={index} className="bar-wrapper">
                    <div 
                      className="bar" 
                      style={{ height: `${data.value * 3}px` }}
                    >
                      <span className="tooltip">{data.value}</span>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;