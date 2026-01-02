import React, { useState } from "react"; // Added useState import
import { db } from '../utils/storage';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in both title and content");
      return;
    }
    
    // Saves to LocalStorage via our utility
    db.addNotice({ title, content });
    
    alert("Notice Published Successfully!");
    setTitle(""); 
    setContent("");
  };

  const registeredStudents = [
    { id: '2021B1A7001', name: 'Alice Smith', branch: 'CSE', pref: 'Vegetarian', status: 'Active' },
    { id: '2021B1A7002', name: 'Bob Johnson', branch: 'ECE', pref: 'Non-Vegetarian', status: 'Active' },
    { id: '2021B1A7003', name: 'Charlie Brown', branch: 'MECH', pref: 'Vegetarian', status: 'Inactive' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />
      <main className="dashboard-main">
        <Navbar pageTitle="Admin Panel" />

        <div className="admin-content">
          <div className="admin-grid">
            {/* Menu Upload (UI Only for now) */}
            <section className="admin-card">
              <h3>Upload New Weekly Menu</h3>
              <form className="admin-form">
                <input type="text" placeholder="Menu Title (e.g., Spring Week 1)" />
                <input type="text" placeholder="Effective Date Range" />
                <div className="file-upload">Click to upload CSV/Excel</div>
                <button type="button" className="btn-primary">Publish Menu</button>
              </form>
            </section>

            {/* Notice Composer (Connected to LocalStorage) */}
            <section className="admin-card">
              <h3>Compose New Notice</h3>
              <form className="admin-form" onSubmit={handlePublish}>
                <input 
                  type="text" 
                  placeholder="Notice Title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                  placeholder="Type your notice here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit" className="btn-primary">Publish Notice</button>
              </form>
            </section>
          </div>

          <section className="admin-card table-section">
            <h3>Registered Students Overview</h3>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Dietary Pref.</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredStudents.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.name}</td>
                      <td>{s.branch}</td>
                      <td>{s.pref}</td>
                      <td><span className={`status-pill ${s.status.toLowerCase()}`}>{s.status}</span></td>
                      <td><button className="view-btn">👁</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;