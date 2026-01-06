import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { db } from '../utils/storage';
import { Bell, Utensils, Users, Trash2, Save } from 'lucide-react';
import '../styles/admin.css';

const AdminPanel = () => {
  const [stats, setStats] = useState({ Breakfast: 0, Lunch: 0, Dinner: 0, totalUsers: 0 });
  const [notices, setNotices] = useState([]);
  const [menu, setMenu] = useState({});
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const tomorrowStr = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-CA');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(db.getMealCounts(tomorrowStr));
    setNotices(db.getNotices());
    setMenu(db.getWeeklyMenu());
  }, [tomorrowStr]);

  // Notice Logic
  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title) return;
    setNotices(db.addNotice(newNotice));
    setNewNotice({ title: '', content: '' });
  };

  // Menu Logic (Save all changes)
  const handleMenuChange = (day, meal, value) => {
    const updatedMenu = { ...menu, [day]: { ...menu[day], [meal]: value } };
    setMenu(updatedMenu);
  };

  const saveMenu = () => {
  try {
    db.updateWeeklyMenu(menu);
    // You could use a toast notification here instead of an alert
    alert("Weekly Menu Updated Successfully!");
  } catch (error) {
    console.error("Failed to save menu:", error);
    alert("Error saving menu. Please try again.");
  }
};;

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" />
      <main className="dashboard-main">
        <Navbar pageTitle="Admin Control Panel" />
        
        <div className="main-content">
          <div className="admin-container">
            
            {/* 1. TOMORROW'S MEAL COUNTS (The Stats Cards) */}
            <h3 className="section-title">Tomorrow's Live Tracking ({tomorrowStr})</h3>
            <div className="menu-card-container">
              <div className="visual-menu-card breakfast-theme">
                <div className="menu-card-header"><h4>BREAKFAST</h4></div>
                <div className="stat-value" style={{fontSize: '2.5rem', color: '#f59e0b'}}>{stats.Breakfast}</div>
                <p style={{color: '#64748b', fontSize: '0.8rem'}}>Confirmed Students</p>
              </div>
              <div className="visual-menu-card lunch-theme">
                <div className="menu-card-header"><h4>LUNCH</h4></div>
                <div className="stat-value" style={{fontSize: '2.5rem', color: '#10b981'}}>{stats.Lunch}</div>
                <p style={{color: '#64748b', fontSize: '0.8rem'}}>Confirmed Students</p>
              </div>
              <div className="visual-menu-card dinner-theme">
                <div className="menu-card-header"><h4>DINNER</h4></div>
                <div className="stat-value" style={{fontSize: '2.5rem', color: '#ef4444'}}>{stats.Dinner}</div>
                <p style={{color: '#64748b', fontSize: '0.8rem'}}>Confirmed Students</p>
              </div>
            </div>

            <div className="admin-actions-grid" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* 2. NOTICE BOARD MANAGEMENT */}
              <section className="admin-glass-card">
                <h3><Bell size={20} /> Notice Management</h3>
                <form onSubmit={handleAddNotice} style={{marginTop: '15px'}}>
                  <input 
                    className="admin-input"
                    placeholder="Title"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  />
                  <textarea 
                    className="admin-input"
                    placeholder="Content"
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                  />
                  <button type="submit" className="save-btn" style={{width: '100%'}}>Post Notice</button>
                </form>
                <div className="admin-list" style={{marginTop: '15px'}}>
                  {notices.map(n => (
                    <div key={n.id} className="admin-item">
                      <span>{n.title}</span>
                      <Trash2 size={16} onClick={() => setNotices(db.deleteNotice(n.id))} color="#ef4444" cursor="pointer" />
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. QUICK MENU UPDATE (For Today/Tomorrow) */}
              <section className="admin-glass-card">
                <h3><Utensils size={20} /> Quick Menu Update</h3>
                <p style={{fontSize: '0.8rem', color: '#64748b'}}>Update specific meals for the week:</p>
                <div style={{marginTop: '15px', maxHeight: '300px', overflowY: 'auto'}}>
                  {Object.keys(menu).map(day => (
                    <div key={day} style={{marginBottom: '15px', borderBottom: '1px solid #334155', paddingBottom: '10px'}}>
                      <h4 style={{color: '#3b82f6'}}>{day}</h4>
                      <input 
                        className="admin-mini-input"
                        value={menu[day].lunch} 
                        onChange={(e) => handleMenuChange(day, 'lunch', e.target.value)}
                        placeholder="Lunch"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={saveMenu} className="save-btn" style={{width: '100%', marginTop: '10px'}}>
                   <Save size={16} /> Save Weekly Menu
                </button>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;