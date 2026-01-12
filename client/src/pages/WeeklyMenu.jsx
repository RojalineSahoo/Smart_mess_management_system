/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Utensils, Save, Edit3, Calendar } from 'lucide-react';

const WeeklyMenu = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [menu, setMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await API.get('/admin/menu');
        setMenu(data || {});
      } catch (err) {
        console.error("Failed to fetch menu");
      }
    };
    fetchMenu();
  }, []);

  const handleUpdate = (day, meal, value) => {
    setMenu(prev => ({
      ...prev,
      [day]: { ...prev[day], [meal]: value }
    }));
  };

  const saveMenu = async () => {
    try {
      await API.put('/admin/menu', { menu });
      setIsEditing(false);
      alert("Weekly Menu Updated Successfully!");
    } catch (err) {
      alert("Failed to update menu");
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="text-emerald-400" /> Weekly Mess Schedule
          </h1>
          <p className="text-slate-400">View and manage the 7-day food rotation</p>
        </div>

        {isAdmin && (
          <button 
            onClick={() => isEditing ? saveMenu() : setIsEditing(true)}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
              isEditing ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {isEditing ? <><Save size={18} /> Save Changes</> : <><Edit3 size={18} /> Edit Menu</>}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className={`bg-slate-800/50 border ${isEditing ? 'border-emerald-500/50' : 'border-slate-700'} rounded-2xl p-5 transition-all`}>
            <h3 className="text-emerald-400 font-bold text-center mb-4 border-b border-slate-700 pb-2">{day}</h3>
            
            {['breakfast', 'lunch', 'dinner'].map((meal) => (
              <div key={meal} className="mb-4 last:mb-0">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">{meal}</label>
                {isEditing ? (
                  <input 
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm focus:border-emerald-500 outline-none"
                    value={menu[day]?.[meal] || ''}
                    onChange={(e) => handleUpdate(day, meal, e.target.value)}
                  />
                ) : (
                  <p className="text-sm font-medium">{menu[day]?.[meal] || 'Not Scheduled'}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyMenu;