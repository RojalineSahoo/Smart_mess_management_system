/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API, applyMeal } from '../services/api';
import { Bell, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [menu, setMenu] = useState({});
  const [applying, setApplying] = useState(false);

  // Calculate Tomorrow's Date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [noticeRes, menuRes] = await Promise.all([
          API.get('/notices'),
          API.get('/admin/menu')
        ]);
        setNotices(noticeRes.data);
        setMenu(menuRes.data);
      } catch (err) {
        console.error("Dashboard sync failed");
      }
    };
    loadData();
  }, []);

  const handleApply = async (mealType) => {
    setApplying(true);
    try {
      await applyMeal({ date: dateStr, mealType });
      alert(`Applied for ${mealType}!`);
    } catch (err) {
      alert(err.response?.data?.message || "Time-lock active: Cannot apply now.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-slate-400">Manage your meals for {dateStr}</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg text-emerald-400">
          Wallet: ₹500.00
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notices Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell size={20} className="text-emerald-400" /> Announcements
          </h2>
          <div className="grid gap-4">
            {notices.map(notice => (
              <div key={notice._id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all">
                <h3 className="font-bold text-emerald-400">{notice.title}</h3>
                <p className="text-sm text-slate-300 mt-1">{notice.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock size={20} className="text-emerald-400" /> Apply for Tomorrow
          </h2>
          {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
            <div key={meal} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">{meal}</span>
                <CheckCircle size={18} className="text-emerald-500" />
              </div>
              <h4 className="text-lg font-bold mb-4">{menu[tomorrow.getDay()]?.[meal.toLowerCase()] || 'Special Menu'}</h4>
              <button 
                onClick={() => handleApply(meal)}
                disabled={applying}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;