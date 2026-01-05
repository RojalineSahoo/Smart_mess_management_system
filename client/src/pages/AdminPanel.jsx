import React, { useState } from "react";
import { db } from '../utils/storage';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allNotices, setAllNotices] = useState(db.getNotices());
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [weeklyEdit, setWeeklyEdit] = useState(db.getWeeklyMenu());

  const handlePublishNotice = (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill all fields");
    db.addNotice({ title, content });
    setAllNotices(db.getNotices());
    setTitle(""); setContent("");
    alert("Notice Published!");
  };

  const handleDeleteNotice = (id) => {
    if(window.confirm("Delete this notice?")) {
      const updated = db.deleteNotice(id);
      setAllNotices(updated);
    }
  };

  const handleWeeklyUpdate = (e) => {
    e.preventDefault();
    db.updateWeeklyMenu(weeklyEdit);
    alert(`Weekly Menu for ${selectedDay} updated!`);
  };

  const registeredStudents = [
    { id: '21BCE1002', name: 'Priya Sharma', branch: 'CSE', status: 'Active' },
    { id: '21BCE1005', name: 'Arjun Verma', branch: 'ECE', status: 'Active' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />
      <main className="dashboard-main">
        <Navbar pageTitle="Admin Control Center" />

        <div className="admin-container">
          {/* Top Row: Menu and Notice Management */}
          <div className="admin-top-grid">
            
            {/* Weekly Menu Card */}
            <section className="admin-glass-card">
              <div className="card-header">
                <div className="header-info">
                  <h3>Weekly Menu Editor</h3>
                  <p>Update the recurring mess schedule</p>
                </div>
                <span className="day-indicator">{selectedDay}</span>
              </div>
              
              <div className="day-tabs">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
                  const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                  return (
                    <button 
                      key={day} 
                      className={selectedDay === fullDays[idx] ? "tab-active" : ""}
                      onClick={() => setSelectedDay(fullDays[idx])}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <form className="admin-compact-form" onSubmit={handleWeeklyUpdate}>
                <div className="input-row">
                  <div className="input-group">
                    <label>Breakfast</label>
                    <input type="text" value={weeklyEdit[selectedDay]?.breakfast || ""} onChange={(e) => setWeeklyEdit({...weeklyEdit, [selectedDay]: { ...weeklyEdit[selectedDay], breakfast: e.target.value }})} />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Lunch</label>
                    <input type="text" value={weeklyEdit[selectedDay]?.lunch || ""} onChange={(e) => setWeeklyEdit({...weeklyEdit, [selectedDay]: { ...weeklyEdit[selectedDay], lunch: e.target.value }})} />
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Dinner</label>
                    <input type="text" value={weeklyEdit[selectedDay]?.dinner || ""} onChange={(e) => setWeeklyEdit({...weeklyEdit, [selectedDay]: { ...weeklyEdit[selectedDay], dinner: e.target.value }})} />
                  </div>
                </div>
                <button type="submit" className="save-btn">Update Schedule</button>
              </form>
            </section>

            {/* Notice Board Card */}
            <section className="admin-glass-card">
              <div className="card-header">
                <div className="header-info">
                  <h3>Notice Board</h3>
                  <p>Broadcast alerts to all students</p>
                </div>
              </div>

              <form className="admin-compact-form" onSubmit={handlePublishNotice}>
                <input className="dark-input" type="text" placeholder="Notice Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="dark-input" placeholder="Enter notice details..." value={content} onChange={(e) => setContent(e.target.value)} rows="3"></textarea>
                <button type="submit" className="publish-btn">Publish Notice</button>
              </form>

              <div className="recent-notices">
                <h4>Active Notices</h4>
                <div className="notice-scroll-area">
                  {allNotices.map(n => (
                    <div key={n.id} className="mini-notice-item">
                      <div className="n-meta">
                        <span className="n-title">{n.title}</span>
                        <span className="n-date">{n.date}</span>
                      </div>
                      <button onClick={() => handleDeleteNotice(n.id)} className="n-del-btn">✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Row: User Management */}
          <section className="admin-glass-card table-card">
            <div className="table-header">
              <h3>Student Management</h3>
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search by name or roll no..." 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Branch</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredStudents.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td><code className="roll-code">{s.id}</code></td>
                    <td>{s.branch}</td>
                    <td><span className="status-badge">Active</span></td>
                    <td><button className="edit-link">Manage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;