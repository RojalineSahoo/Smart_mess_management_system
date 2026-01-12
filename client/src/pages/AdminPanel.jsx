/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { Users, Utensils, TrendingDown, Bell, Plus, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const [stats, setStats] = useState({ Breakfast: 0, Lunch: 0, Dinner: 0 });
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const date = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const [statsRes, noticeRes] = await Promise.all([
        API.get(`/admin/live-stats?date=${date}`),
        API.get('/notices')
      ]);
      setStats(statsRes.data);
      setNotices(noticeRes.data);
    } catch (err) {
      console.error("Error loading Admin data", err);
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    try {
      await API.post('/notices', newNotice);
      setNewNotice({ title: '', content: '' });
      fetchData(); // Refresh list
    } catch (err) {
      alert("Failed to post notice");
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Admin Command Center</h1>
        <p className="text-slate-400">Live Operations for {date}</p>
      </header>
      
      {/* 1. Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
          <div key={meal} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <Utensils size={20} className="text-emerald-400" />
              <span className="text-xs font-semibold text-slate-500 uppercase">Live Count</span>
            </div>
            <div className="text-4xl font-bold">{stats[meal] || 0}</div>
            <div className="text-sm text-slate-400 mt-1">{meal} Applications</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Notice Management */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Bell className="text-emerald-400" /> Broadcast New Notice
          </h3>
          <form onSubmit={handlePostNotice} className="space-y-4">
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 focus:border-emerald-500 outline-none"
              placeholder="Notice Title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
            />
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 h-24 focus:border-emerald-500 outline-none"
              placeholder="Detailed Content..."
              value={newNotice.content}
              onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
            />
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-all">
              <Plus size={18} /> Post to Student Dashboard
            </button>
          </form>
        </section>

        {/* 3. Recent Notices List */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6">Active Announcements</h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {notices.map((n) => (
              <div key={n._id} className="flex justify-between items-start bg-slate-900 p-4 rounded-xl border border-slate-700">
                <div>
                  <h4 className="font-bold text-emerald-400">{n.title}</h4>
                  <p className="text-sm text-slate-400">{n.content}</p>
                </div>
                <button className="text-slate-500 hover:text-rose-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;